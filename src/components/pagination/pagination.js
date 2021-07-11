export default function Pagination(props){  
    let arr = [];
    for(let i = 1;  i <= props.pagesLength; i++){
        arr.push(i)
    }

    function createPaginationItem(i){
        return (
            <div className={`pagination_item${props.activePage === i ? ' active' : ''}`} key={i} onClick={() => props.setActivePage(i)}>{i}</div>
        )
    }

    return (
        <div className="pagination">
            <div className="pagination_box">
                <div
                    className={`pagination_arrow${props.activePage === 1 ? ' disabled' : ''}`}
                    onClick={() => props.setActivePage(1)}
                >
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.67 1.77L9.9 0L0 9.9L9.9 19.8L11.67 18.03L3.54 9.9L11.67 1.77Z" fill="#3597AA"/>
                    </svg>
                </div>
                {props.activePage > 4  && <div className="pagination_dots">...</div>}
                {arr.map((i,n) => {
                    if(n > props.activePage - 4 && n < props.activePage + 2) return createPaginationItem(i)
                    return null;                    
                })}                
                {props.activePage < props.pagesLength - 2 && <div className="pagination_dots">...</div>}
                <div
                    className={`pagination_arrow${props.activePage === props.pagesLength ? ' disabled' : ''} pagination_arrow-last`}
                    onClick={() => props.setActivePage(props.pagesLength)}
                >
                    <svg width="12" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2.12L7.88 10L0 17.88L2.12 20L12.12 10L2.12 0L0 2.12Z" fill="#3597AA"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}