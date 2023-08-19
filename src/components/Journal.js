import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { api } from "../api/Api";
import { UserContext } from "../UserContext";


const Journal = () => {
    const [journalEntryDays, setJournalEntryDays] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState([]);
    const [currentDate, setCurrentDate] = useState();
    const [pageContainerDynamicClasses, setPageContainerDynamicClasses] = useState('translate-x-0 shadow-lg');
    const { user } = useContext(UserContext);

    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    });

    useEffect(() => {
        setLoading(true)
        api.getGroupedJournalEntries(user).then(response => {
            const responseData = response?.data;
            setJournalEntryDays(responseData);
            const idx = Object.keys(responseData)[0];
            setCurrentDate(idx);
            setCurrentItem(responseData[idx]);
        });
        setLoading(false);
        handleResize();
    }, [user]);

    function formatDate(k) {
        return k ? moment(new Date(k)).format('DD.MM.YYYY') : 'No entries in your journal yet';
    }

    function formatDateTime(k) {
        return k ? moment(new Date(k)).format('HH:mm:ss') : null;
    }

    function itemEntryKeys() {
        return currentItem && Object.keys(currentItem) ? Object.keys(currentItem) : null;
    }

    const timeEntry = ({ id, content, zonedDateTime }) => {
        return (
            <div key={id} id={id} className="mb-5" >
                <p><b>{formatDateTime(zonedDateTime)}</b></p>
                <p>{content}</p>
            </div>
        );
    }

    const showMobileSidebar = () => {
        setPageContainerDynamicClasses('translate-x-0 shadow-lg');
    }

    const setItem = (k) => {
        setCurrentDate(k);
        setCurrentItem(journalEntryDays[k]);
        setPageContainerDynamicClasses('-translate-x-full');
    }

    const currentItemTitle = () => {
        return formatDate(currentDate);
    }

    if (isLoading) return <span className="loading loading-ring loading-lg"></span>

    return (
        <Layout>
            <div>
                <div id="page-container" className="relative mx-auto flex min-h-screen min-w-[320px] flex-col bg-white lg:ml-96">
                    {isMobile && <button onClick={() => showMobileSidebar()} type="button" className="group inline-flex items-center gap-1.5 rounded bg-zinc-100 px-2.5 py-2 text-sm font-medium hover:bg-zinc-200/75 active:bg-zinc-100 active:text-zinc-700">
                        <svg className="hi-solid hi-menu-alt-1 inline-block h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                        </svg>
                    </button>}

                    <nav id="page-sidebar" style={{ top: "88px" }}
                        className={"fixed bottom-0 left-0 top-88 z-50 flex h-full w-full border-r border-zinc-200/75 bg-zinc-50 transition-transform duration-500 ease-out sm:w-96 lg:translate-x-0 lg:shadow-none " + pageContainerDynamicClasses}
                        aria-label="Main Sidebar Navigation">

                        <div className="grow overflow-auto">
                            <div className="flex items-start justify-between border-b border-dashed border-zinc-200 px-5 py-4">
                                <div className="grow">
                                    <h1 className="mb-0.5 text-2xl font-semibold">Journal</h1>
                                </div>
                            </div>

                            <div className="grow divide-y divide-dashed divide-zinc-200">
                                {Object.keys(journalEntryDays).map((k, v) => (
                                    <button key={k} className={"w-full flex space-x-3 p-4 cursor-pointer " + (currentDate === k ? "bg-zinc-100" : "bg-white")}>
                                        <div className="grow" onClick={() => setItem(k)}>
                                            <h3 className="mb-1 line-clamp-1 text-sm font-semibold">
                                                {formatDate(k)}
                                            </h3>
                                        </div>
                                    </button>
                                ))}

                            </div>
                        </div>
                    </nav>

                    <main id="page-content" className="grow bg-zinc-100 lg:pt-0">
                        <div className="container mx-auto px-4 py-4 lg:p-8 xl:max-w-4xl">
                            <div className="mb-2 rounded-b bg-white">
                                <h3 className="border-y border-dashed border-zinc-200 px-6 py-3 text-lg font-bold md:px-10">
                                    <span>{currentItemTitle()}</span>
                                </h3>
                                <div className="prose prose-sm max-w-none p-6 md:p-10">
                                    {itemEntryKeys()?.map((ik, iv) => (timeEntry(currentItem[ik])))}
                                </div>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </Layout>
    )
}

export default Journal;