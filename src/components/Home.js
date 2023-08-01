import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../AuthContext";
import { api } from "../api/Api";

const { default: React } = require("react");
const { default: Layout } = require("../Layout");

const Home = () => {
    const { getUser } = useAuth();

    async function save(event) {
        event.preventDefault();
        var content = event.target.journalcontent.value;
        api.createJournalEntry(content, getUser());
        api.writceJournalEntryToIndex(content, getUser());
        toast('Entry saved successfully!');
    }

    return (
        <Layout>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="flex justify-center">
                <form onSubmit={save} method='post'>
                    <div className="max-w-xl lg:max-w-lg text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Take a brain dump!</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                            Use the power of AI leveraged journaling.
                            Just type in every day here, everything that seems important and the AI will lead you through
                            your mind jungle!
                        </p>
                        <div className="mt-6 flex gap-x-4 text-center">
                            <textarea
                                id="journalcontent"
                                name="journalcontent"
                                required
                                className="textarea textarea-lg textarea-info min-w-0 flex-auto rounded-md border-0 w-full max-w-x text-black"
                                placeholder="Let it all out..."
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <button type="submit" className="btn btn-primary btn-lg">Journalize</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Home;