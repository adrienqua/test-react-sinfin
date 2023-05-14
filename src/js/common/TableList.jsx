import React, { useState, useEffect } from "react"
import TableListItem from './TableListItem'
import TableHeader from './TableHeader';

const TableList = ({headerDatas, datas}) => {
    
    return (
        <div className="table-list">
        <table className="table text-center align-middle rounded-container">
            <thead>
                <tr>
                    {headerDatas.map((headerData) => (
                    <TableHeader data={headerData} key={headerData.label}/>
                ))} 
                </tr>
            </thead>
            <tbody>
                {datas.map((data) => (
                    <TableListItem headerDatas={headerDatas} data={data} key={data.id}/>
                ))} 
            </tbody>
            </table>
        </div>      
    )
}

export default TableList