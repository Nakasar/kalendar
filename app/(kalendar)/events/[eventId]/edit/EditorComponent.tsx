import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  directivesPlugin,
  headingsPlugin,
  InsertAdmonition,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";

interface EditorProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

export default function EditorComponent({
  markdown,
  setMarkdown,
  editorRef,
}: EditorProps) {
  return (
    <MDXEditor
      contentEditableClassName="prose"
      ref={editorRef}
      markdown={markdown}
      onChange={setMarkdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BlockTypeSelect />
              <CreateLink />
              <BoldItalicUnderlineToggles />
              <InsertTable />
              <InsertAdmonition />
              <InsertThematicBreak />
              <ListsToggle />
            </>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        linkDialogPlugin(),
        linkPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
}
