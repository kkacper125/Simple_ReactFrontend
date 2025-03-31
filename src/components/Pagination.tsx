
interface Props{
    activePage: number,
    totalNumberOfElements: number,
    pageLenght: number, 
    onClick: (currentPage: number) => void
}

export function Pagination({activePage, totalNumberOfElements, pageLenght, onClick}: Props){
    const totalNumberOfPages = Math.ceil(totalNumberOfElements / pageLenght);
    let pagesHtml = [];

    if((activePage - 1) > 0){
        pagesHtml.unshift(activePage-1);
    }
    
    pagesHtml.push(activePage);
    
    if((activePage + 1) <= totalNumberOfPages){
        pagesHtml.push(activePage+1);
    } 

    return (
        <nav className="bottom-0">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a onClick={() => {
                                        if((activePage -1) > 0){
                                            onClick(activePage-1);
                                        }
                                    }
                                } 
                        className="page-link text-success">
                        Previous
                    </a>
                </li>
                {pagesHtml.map((pageNumber) => (
                    <li className="page-item" key={pageNumber}>
                        <a onClick={() => onClick(pageNumber)} className={pageNumber == activePage ? "page-link text-bg-success" : "page-link text-success"}>
                            {pageNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a onClick={() => {
                                        if((activePage + 1) <= totalNumberOfPages){
                                            onClick(activePage+1);
                                        }
                                    }
                                } 
                        className="page-link text-success">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}