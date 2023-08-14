
function init_editorjs(input_id, output_id)  {

    const editor = new EditorJS({
        holder: input_id,

        tools: {
            header: Header,        
            list: List,        
            checklist: Checklist,
            quote: Quote,
            code: CodeTool,
            table: Table,
        }  
    });
}