import moment from "moment";
import { useEffect, useState } from "react";
import Layout from "../Layout";
import { api } from "../api/Api";
import React from "react";
import { useAuth } from "../AuthContext";

const Journal = () => {
    const [journalEntryDays, setJournalEntryDays] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState([]);
    const [currentDate, setCurrentDate] = useState();
    const { getUser } = useAuth();

    useEffect(() => {
        setLoading(true)
        api.getGroupedJournalEntries(getUser()).then(response => {
            const responseData = response.data;
            setJournalEntryDays(responseData);
            const idx = Object.keys(responseData)[0];
            setCurrentDate(idx);
            setCurrentItem(responseData[idx]);
        });
        setLoading(false);

    }, [getUser]);

    function formatDate(k) {
        return moment(new Date(k)).format('DD.MM.YYYY');
    }

    function formatDateTime(k) {
        return moment(new Date(k)).format('HH:mm:ss');
    }

    const timeEntry = ({ id, content, zonedDateTime }) => {
        return (
            <div className="mb-5">
                <p><b>{formatDateTime(zonedDateTime)}</b></p>
                <p>{content}</p>
            </div>
        );
    }

    const setItem = (k) => {
        setCurrentDate(k);
        setCurrentItem(journalEntryDays[k]);
    }

    const currentItemTitle = () => {
        return formatDate(currentDate);
    }

    if (isLoading) return <span className="loading loading-ring loading-lg"></span>

    return (
        <Layout>
            <div className="w-full">
                <div
                    id="page-container" className="relative mx-auto flex min-h-screen min-w-[320px] flex-col bg-white">
                    <div
                        id="page-sidebar"
                        className="absolute bottom-0 left-0 top-0 z-50 flex h-full w-full border-r border-zinc-200/75 bg-zinc-50 transition-transform duration-500 ease-out sm:w-96 lg:translate-x-0 lg:shadow-none"
                        aria-label="Main Sidebar Navigation"
                        x-cloak>

                        <div className="grow overflow-auto">
                            <div className="flex items-start justify-between border-b border-dashed border-zinc-200 px-5 py-4">
                                <div className="grow">
                                    <h1 className="mb-0.5 text-2xl font-semibold">Journal</h1>
                                </div>
                            </div>

                            <div className="grow divide-y divide-dashed divide-zinc-200">
                                {Object.keys(journalEntryDays).map((k, v) => (
                                    <a className={"flex space-x-3 p-4 cursor-pointer " + (currentDate == k ? "bg-zinc-100" : "bg-white")}>
                                        <div className="grow" onClick={() => setItem(k)}>
                                            <h3 className="mb-1 line-clamp-1 text-sm font-semibold">
                                                {formatDate(k)}
                                            </h3>
                                        </div>
                                    </a>
                                ))}

                                <div className="p-3 text-center">
                                    <button
                                        type="button"
                                        className="active:text-zinc-00 group inline-flex items-center gap-0.5 rounded bg-zinc-50 px-2 py-1.5 text-sm font-medium hover:bg-zinc-200/50 active:bg-transparent"
                                    >
                                        <svg
                                            className="hi-mini hi-arrow-small-down inline-block h-5 w-5 text-zinc-500 group-hover:text-indigo-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <span>Load more..</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="page-content" className="grow bg-zinc-100 pt-20 lg:pt-0">
                        <div className="mx-auto px-4 py-4 ml-96">
                            <div className="mb-2 rounded-b bg-white">
                                <h3 className="border-y border-dashed border-zinc-200 px-6 py-3 text-lg font-bold md:px-10">
                                    <span>{currentItemTitle()}</span>
                                </h3>
                                <div className="prose prose-sm max-w-none p-6 md:p-10">
                                    {Object.keys(currentItem).map((ik, iv) => (timeEntry(currentItem[ik])))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Journal;