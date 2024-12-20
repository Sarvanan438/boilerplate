import { StyleSheet, StatusBar, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import data from "./components/TreeSelect/data";
import { createTreeDict } from "./components/TreeSelect/logic";
import TreeComponent from "./components/TreeSelect/TreeSelect";
import { useCallback, useMemo, useState } from "react";
import Label from "./components/Label";
console.log(JSON.stringify(createTreeDict(data)));
const data2 = [
  {
    id: "1",
    value: "Parent",

    isExpanded: true,
    children: [
      {
        id: "2",
        value: "Child 1",

        children: [{ id: "4", value: "Child 11 ", children: [] }],
      },
      {
        id: "3",
        value: "Child 2",

        children: [{ id: "5", value: "Child 21", children: [] }],
      },
    ],
  },
  {
    id: "6",
    value: "Parent 2",

    isExpanded: true,
    children: [
      {
        id: "7",
        value: "Child 2 1",

        children: [{ id: "8", value: "Child 2 11 ", children: [] }],
      },
      {
        id: "9",
        value: "Child 2 2",

        isExpanded: true,
        children: [{ id: "10", value: "Child 21", children: [] }],
      },
    ],
  },
];
function getNodeStatus(node, selections) {
  if (node.children.length === 0) return "unchecked";

  const res = node.children.reduce((acc, item) => {
    const status = selections[item.id].status;
    acc += status == "checked" ? 1 : status == "indeterminate" ? 0.5 : 0;
    return acc;
  }, 0);

  return res === 0
    ? "unchecked"
    : res === node.children.length
    ? "checked"
    : "indeterminate";
}
function createSelectionTree(
  data,
  selectedIds,
  selections = {},
  isParentSelected = false
) {
  if (data == null || !data.length) return selections;

  data.forEach((item) => {
    createSelectionTree(
      item.children,
      selectedIds,
      selections,
      isParentSelected || selectedIds.has(item.id)
    );
    const status =
      isParentSelected || selectedIds.has(item.id)
        ? "checked"
        : getNodeStatus(item, selections);
    selections[item.id] = {
      status,
      isDisabled:
        isParentSelected ||
        (status != "unchecked" && !selectedIds.has(item.id)),
    };
  });
  return selections;
}
export function App() {
  const [selections, setSelections] = useState(new Set());
  const onSelect = useCallback(
    (node) => {
      const newSelections = new Set([...selections]);
      if (newSelections.has(node.id)) newSelections.delete(node.id);
      else newSelections.add(node.id);
      setSelections(newSelections);
    },
    [selections, setSelections]
  );
  const selectedStatus = useMemo(
    () => createSelectionTree(data, selections),
    [selections]
  );
  console.log("selected", selections, selectedStatus);
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Label text="Hello" containerStyle={{ width: 200 }} />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    marginTop: StatusBar.currentHeight,
  },
});
registerRootComponent(App);
