import FrontLayout from "@/layouts/front-layout"
import { Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors }:
        {
            data:
            { title: string, content: string, image_url: any },
            setData: any, post: any, processing: any, errors: any
        }
        = useForm({
            title: '',
            content: '',
            image_url: null
        });

    const handleChange = (e: any) => {
        const key = e.target.name;
        const value = e.target.value;
        setData(key, value);
    };

    const handleFile = (e: any) => {
        const file = e.target.files[0];
        setData('image_url', file);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route('posts.store'));
    };


    return (
        <FrontLayout>
            <h1 className="font-bold text-3xl my-3">Crea nuovo post</h1>
            <p className="text-red-500">{errors.title}</p>
            <p className="text-red-500">{errors.content}</p>
            <p className="text-red-500">{errors.image_url}</p>

            <form method="post" encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="title" className="block mb-1">Titolo</label>
                    <input type="text" name="title" id="title" className="w-full p-2 border border-gray-300" onChange={handleChange} value={data.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="block mb-1">Contenuto</label>
                    <textarea name="content" id="content" className="w-full p-2 border border-gray-300" onChange={handleChange} value={data.content} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="block mb-1">Immagine</label>
                    <input type="file" name="image" id="image" className="w-full p-2 border border-gray-300" onChange={handleFile} />
                </div>
                <div className="flex">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-800 transition-all text-white p-2 me-3" disabled={processing}>{processing ? 'Invio...' : 'Salva'}</button>
                    <Link href={route('posts.index')} className="bg-red-500 hover:bg-red-800 transition-all text-white p-2">Annulla</Link>
                </div>
            </form>
        </FrontLayout>
    );

}