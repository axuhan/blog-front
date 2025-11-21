import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
    value: string,
    onChange: (value: string) => void
}

export default function QuillEditor({value, onChange}: Props) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strikethrough'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strikethrough',
        'list', 'bullet',
        'link', 'image'
    ];

    return (
        <ReactQuill
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
            theme="snow"/>
    );
}