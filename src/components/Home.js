import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../api/Api";
import { UserContext } from '../UserContext';

const { default: React, useContext } = require("react");
const { default: Layout } = require("../Layout");

const Home = ({setStatus}) => {
    const { user } = useContext(UserContext);

    async function save(event) {
        event.preventDefault();
        var content = event.target.journalcontent.value;
        api.createJournalEntry(content, user);
        api.writeJournalEntryToIndex(content, user);
        toast('Entry saved successfully!');
    }

    return (
        <Layout setStatus={setStatus}>
            <ToastContainer
                position="bottom-center"
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
                            the jungle in your mind!
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