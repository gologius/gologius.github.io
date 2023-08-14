function init_quill_editor(input_id, output_id)  {

    //ツールバー設定
    const toolbarOptions = [
        [
            { size: [ 'small', false, 'large', 'huge' ]},
            { 'color': [] }, 
            { 'background': [] },
            'bold', 
            'italic', 
            'underline', 
            'strike'
        ],
        ['link', 'image','video','formula'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }], 
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['clean']// remove formatting button
    ];

    //他設定
    const baseOption  = {
        modules: {
            toolbar:  toolbarOptions,
        },
        placeholder: '本文を入力してください',
        theme: 'snow'
    };

    var editor_input = document.getElementById(input_id);
    var editor_output = document.getElementById(output_id);
    
    var quill = new Quill(editor_input, baseOption);
    
    //inputにセットされている生HTMLを、変換してエディタに反映させる
    let initialContent = quill.clipboard.convert(editor_output.value);
    quill.setContents(initialContent);
    quill.root.innerHTML =  editor_output.value;

    //エディタ入力時に、input に生HTMLをセットする 
    quill.on('text-change', function(delta, oldDelta, source) {
        var editorHtml = editor_input.querySelector('.ql-editor').innerHTML;
        editor_output.value = editorHtml;
    });
}
