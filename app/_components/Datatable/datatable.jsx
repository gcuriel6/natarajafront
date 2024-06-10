"use client"

import DataTable from "react-data-table-component";
import { useState, useMemo, Suspense } from "react";
import { redirectUser } from "@/app/_lib/actions";

const redirectButton  = (redirectNew) => {
    if(redirectNew==""){
        return (<></>)
    }

    return(
        <button
            type="button"
            onClick={e => redirectUser(redirectNew)}
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
		</button>
    )
}

const FilterComponent = ({ filterText, onFilter, onClear, redirectNew }) => (
	<>
        {redirectButton(redirectNew)}
		<input
			id="search"
			type="text"
			placeholder="Buscar por nombre"
			aria-label="Buscar"
			defaultValue={filterText}
            className="rounded-lg appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            autoFocus
		/>
        <button
            type="button"
            onClick={onFilter}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
		</button>
		<button
            type="button"
            onClick={onClear}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
		</button>
	</>
);

export default function Datatable(params) {

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = params.data.filter(item => item.nombres && item.nombres.toLowerCase().includes(filterText.toLowerCase()));
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            document.getElementById("search").value = "";
            setFilterText('');
        }
        };
        return <FilterComponent onFilter={e => setFilterText(document.getElementById("search").value)} onClear={handleClear} filterText={filterText} redirectNew={params.linkNew}/>;
    }, [filterText, resetPaginationToggle]);
    
    return (
        <>
            <div className="w-full h-screen">
                <Suspense>
                    <DataTable
                        pagination
                        title={params.title}
                        columns={params.columns}
                        data={filteredItems}
                        dense
                        paginationResetDefaultPage={resetPaginationToggle}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                    />
                </Suspense>
            </div>
        </>
    )
}