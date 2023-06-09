import React from "react";

import Button from "../Button/Button";
import ListItem from "../List/ListItem";
import Menu from "../Menu/Menu";

import styles from './Pagination.module.css';

const PaginationMenu = props => {

    const {
        total,
        currentPage,
        buttons,
        setCurrentPage,
        className,
    } = props;

    return <Menu className={`${styles.menu}${className ? ' ' + className : ''}`}>

        <ListItem>
            <Button
                onClick={() => setCurrentPage(currentPage-1)}
                disabled={(currentPage === 1)}
            >&lt;</Button>
        </ListItem>

        {buttons.map((button, idx) => {
            return <ListItem key={idx}>
                {button}
            </ListItem>;
        })}

        <ListItem>
            <Button
                onClick={() => setCurrentPage(currentPage+1)}
                disabled={(currentPage === total)}
            >&gt;</Button>
        </ListItem>

    </Menu>;
}

const Pagination = props => {

    const {
        itemCount,
        pageSize,
        currentPage,
        visiblePillCount,
        setCurrentPage,
        className,
    } = props;

    const totalPages = Math.ceil(itemCount / (pageSize ? pageSize : 10));

    const buttons = [];

    const lengthExceeded = (visiblePillCount && parseInt(visiblePillCount) > -1) ? totalPages > (parseInt(visiblePillCount) + 4) : totalPages > 7;

    if(!lengthExceeded) {

        // If we can display all the buttons without taking up more space than using ellipses,
        // then just display all the buttons

        for(let i = 1; i <= totalPages; i++) {
    
            buttons.push(
                <Button
                    onClick={() => setCurrentPage(i)}
                    disabled={(currentPage === i)}
                >{i}</Button>
            );
        }

    } else {

        if((currentPage < parseInt(visiblePillCount)) || (currentPage > (totalPages - parseInt(visiblePillCount) + 1))) {

            // If the current page is near the beginning or end of the list,
            // just display the beginning and end of the list

            for(let i = 1; i <= parseInt(visiblePillCount); i++) {
        
                buttons.push(
                    <Button
                        onClick={() => setCurrentPage(i)}
                        disabled={(currentPage === i)}
                    >{i}</Button>
                );
            }

            buttons.push(<span>...</span>);

            for(let i = totalPages - 2; i <= totalPages; i++) {

                buttons.push(
                    <Button
                        onClick={() => setCurrentPage(i)}
                        disabled={(currentPage === i)}
                    >{i}</Button>
                );
            }

        } else {

            // If the current page is in the middle of the list, concatenate the list using ellipses

            buttons.push(
                <Button
                    onClick={() => setCurrentPage(1)}
                    disabled={(currentPage === 1)}
                >{1}</Button>,
                <Button disabled={true}><span>...</span></Button>,
            );

            const startPage = currentPage - Math.floor(parseInt(visiblePillCount) / 2);

            for(let i = startPage; i < startPage + parseInt(visiblePillCount); i++) {

                buttons.push(
                    <Button
                        onClick={() => setCurrentPage(i)}
                        disabled={(currentPage === i)}
                    >{i}</Button>
                );
            }

            buttons.push(
                <Button disabled={true}><span>...</span></Button>,
                <Button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={(currentPage === totalPages)}
                >{totalPages}</Button>,
            );
        }

    }

    return <PaginationMenu
        total={totalPages}
        currentPage={currentPage}
        buttons={buttons}
        setCurrentPage={setCurrentPage}
        className={className}
    />;
}

export default Pagination;