/**
 *    only the selected node should be sent , the path i.e parent nodes are in determinate and disabled
 *    same on a parent selection all sub child nodes are disabled
 *    entire list is shown
 *
 */

// define a tree component , we will build logic on top of thic
import { useCallback, useState } from "react";
import { StyleSheet, ViewStyle, View, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Checkbox, CheckboxProps, Icon } from "react-native-paper";
type SelectionType = {
  [index: string]: {
    status: StatusType;
    isDisabled: boolean;
  };
};
export type StatusType = CheckboxProps["status"];
const levelMargin = 20;
export interface DataType<T = string> {
  id: string;
  value: T;
  status: StatusType;
  isDisabled?: boolean;
  children: Array<DataType>;
  isExpanded: boolean;
}
export type renderItemType = (node: DataType) => React.ReactNode;
export interface TreeProps {
  data: Array<DataType>;
  renderItem: renderItemType;
  containerStyle: ViewStyle;
  listStyle: ViewStyle;
  level: number;
  expandAll?: boolean;
  onSelect: (node: DataType) => void;
  selections: SelectionType;
}
interface RenderNode {
  node: DataType;
  renderItem: renderItemType;
  level: number;
  listStyle: ViewStyle;
  expandAll: boolean;
  toggleExpand: (id: string) => void;
  onSelect: (node: DataType) => void;
  isExpanded: (id: string) => boolean;
  selection: SelectionType;
}
export function RenderNode({
  node,
  renderItem,
  level,
  listStyle,
  expandAll,
  toggleExpand,
  isExpanded,
  onSelect,
  selection,
}: RenderNode) {
  const hasChildren = !!node.children?.length;
  const isNodeExpanded = expandAll || isExpanded(node.id);

  return (
    <View>
      <View style={styles.nodeStyle}>
        {hasChildren && (
          <Pressable onPress={() => toggleExpand(node.id)}>
            <Icon
              source={isNodeExpanded ? "chevron-down" : "chevron-right"}
              size={20}
            />
          </Pressable>
        )}
        <Checkbox.Android
          //status="unchecked"
          status={selection[node.id].status}
          disabled={selection[node.id].isDisabled}
          onPress={() => onSelect(node)}
        />
        {renderItem(node)}
      </View>
      {isNodeExpanded && (
        <List
          data={node.children}
          listStyle={listStyle || styles.listContainer}
          level={level + 1}
          renderItem={renderItem}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
          onSelect={onSelect}
          selections={selection}
        />
      )}
    </View>
  );
}
export function List({
  data,
  listStyle,
  renderItem,
  level,
  expandAll = false,
  toggleExpand,
  isExpanded,
  onSelect,
  selections,
}: Omit<TreeProps, "containerStyle"> & Partial<RenderNode>) {
  return (
    <View
      style={[
        styles.listContainer,
        listStyle,
        { marginLeft: level * levelMargin },
      ]}
    >
      {data.map((item) => (
        <RenderNode
          node={item}
          level={level}
          listStyle={listStyle}
          renderItem={renderItem}
          key={item.id}
          expandAll={expandAll}
          isExpanded={isExpanded!}
          onSelect={onSelect}
          toggleExpand={toggleExpand!}
          selection={selections}
        />
      ))}
    </View>
  );
}
export default function TreeComponent({
  data,
  listStyle,
  containerStyle,
  renderItem,
  expandAll = false,
  onSelect,
  selections,
}: TreeProps) {
  const [expanded, setExpanded] = useState(new Set());
  const isExpanded = useCallback((id: string) => expanded.has(id), [expanded]);
  const toggleExpand = useCallback(
    (id: string) => {
      const updatedSet = new Set([...expanded]);
      if (updatedSet.has(id)) updatedSet.delete(id);
      else updatedSet.add(id);
      setExpanded(updatedSet);
    },
    [expanded, setExpanded]
  );
  return (
    <FlatList
      style={[styles.container, containerStyle]}
      data={data}
      renderItem={({ item }) => (
        <RenderNode
          node={item}
          level={0}
          listStyle={listStyle}
          renderItem={renderItem}
          key={item.id}
          expandAll={expandAll}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
          onSelect={onSelect}
          selection={selections}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    minWidth: 200,
    height: "100%",
    flex: 1,
  },
  nodeStyle: {
    flex: 1,
    flexDirection: "row",
    minHeight: 50,
    backgroundColor: "white",
    alignItems: "center",
  },
});
