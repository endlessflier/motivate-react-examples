import React, { useState } from "react";

const initialRoot = {
  name: "root",
  showChildren: true,
  FolderNodes: [
    {
      name: "public",
      showChildren: false,
      FolderNodes: [],
      FileNodes: ["index.html"]
    },
    {
      name: "src",
      showChildren: true,
      FolderNodes: [],
      FileNodes: ["App.js", "Glance.js", "InfiniteScroll.js", "styles.css"]
    }
  ],
  FileNodes: ["readme.md", "package.json"]
};
function Tree() {
  const [tree, setTree] = useState(initialRoot);

  return (
    <ul className="tree">
      <Folder folderNode={tree} setFolders={setTree} />
    </ul>
  );
}

function Folder(props) {
  // const [showChildren, setShowChildren] = useState(true);

  return (
    <li>
      <strong
        onClick={() => {
          // setShowChildren(!showChildren);
        }}
      >
        {props.folderNode.name}
      </strong>
      {props.folderNode.showChildren && (
        <ul className="folder">
          {props.folderNode?.FolderNodes.map((folder, index) => {
            console.log(
              Math.random(),
              folder.name,
              folder.showChildren,
              folder.FolderNodes.length + folder.FileNodes.length
            );
            return (
              <Folder
                key={index}
                folderNode={folder}
                setFolders={props.setFolders}
              />
            );
          })}
          {props.folderNode?.FileNodes.map((file, index) => {
            return (
              <li className="file" key={file}>
                {file}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
export default Tree;
