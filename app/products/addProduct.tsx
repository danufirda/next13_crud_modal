'use client';
import { SyntheticEvent,useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct(){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modal,setModal] = useState(false);
    const [isMutating,setIsMutating] = useState(false);
    const router = useRouter();
    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch('http://localhost:5000/products',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price
            })
        });
        setIsMutating(false);
        // set title & price kemabli empty
        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }
    function handleChange(){
        setModal(!modal);
    }

    return (
        <div>

            <button className="btn btn-primary" onClick={handleChange}>Add New</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg"> Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input w-full input-bordered" placeholder="Product name.." />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="input w-full input-bordered" placeholder="Price.."/>
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleChange}>Close</button>
                            {!isMutating ? (
                                <button className="btn btn-primary" type="submit">Save</button>
                            ):(
                                <button className="btn loading" type="button">Saving..</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}