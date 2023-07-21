import { useState } from "react";
import Layout from "../Layout";
import { api } from "../api/Api";

const Query = () => {

    const [response, setResponse] = useState()

    async function save(event) {
        event.preventDefault();
        var input = event.target.question.value;
        api.query(input).then(res => {
            setResponse(res);
            window.my_modal_2.showModal();
        });
    }

    return (
        <Layout>
            <div className="flex justify-center">
                <form onSubmit={save} method='post'>
                    <div className="max-w-xl lg:max-w-lg text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ask your second brain!</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                            When was my last dental appointment? What are the points from yesterdays meeting?
                        </p>
                        <div className="mt-6 flex gap-x-4 text-center">
                            <textarea
                                id="question"
                                name="question"
                                required
                                className="textarea textarea-lg textarea-info min-w-0 flex-auto rounded-md border-0 w-full max-w-x text-black"
                                placeholder="Ask your AI augmented brain..."
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <button type="submit" className="btn btn-primary btn-lg">Enligthen yourself</button>
                        </div>
                    </div>
                </form>

                <dialog id="my_modal_2" className="modal">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Your second brain has got this for you..</h3>
                        <p className="py-4">{response}</p>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </Layout>
    )
}

export default Query;