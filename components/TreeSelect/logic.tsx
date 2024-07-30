
export interface DataType<T=any>{
    id:string;
    value:T;
    children:Array<DataType>|null;
}
export interface Node{
    id:string;
    parent:Node|null;
    orgNode:DataType;
    children:Array<Node>;
}

export type CheckedStatus = 'checked'|'indeterminate'|'unchecked';
export interface SelectionInput{
    [index:string]:{status:CheckedStatus,children:SelectionInput}
}
export function createTreeDict(data:DataType['children'],parent:Node|null=null){
   
    if(data ==null) return [];
    const dict:Array<Node>=[];
    data.forEach(item=>{
       const node:Node =  {id:item.id,orgNode:item,parent,children:[]};
       node.children=createTreeDict(item.children,node);
    });
    return dict;
}
export function checkChildrens(node:Array<Node>,selections:SelectionInput={}){
   if(node == null) return selections;
   node.forEach(item=>{
    selections[item.id] = {
        status:'checked',
        children:checkChildrens(item.children,{}),
    }
   });
   return selections;
}

export function traverseParent(node:Node|null,selections:SelectionInput){
    if(node ==null) return selections;
    return traverseParent(node.parent,{
        [node.id]:{status:'indeterminate',children:selections}
    })
}
export function findParent(node:Node){
   while(node.parent!=null)
    return findParent(node.parent);
}
export function reconcile(selections:SelectionInput,newSelections:SelectionInput){
    
}
export function checkNode(selections:SelectionInput,node:Node){
    let  newSelections:SelectionInput = {[node.id]:{ status:'checked', children:checkChildrens(node.children,{})}};
    newSelections = traverseParent(node.parent,newSelections);
    

}
