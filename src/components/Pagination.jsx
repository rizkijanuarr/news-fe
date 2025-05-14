//import pagination
import Pagination from "react-js-pagination";

function definePagination(props) {
    return (
        props.total > 0 && (
            <Pagination
                innerClass={`pagination pagination-sm justify-content-${props.position} mb-0 mt-3`}
                activePage={props.currentPage + 1} // Add 1 because backend uses 0-based index
                activeClass="page-item active"
                itemsCountPerPage={props.pageSize || 5} // Use pageSize from BE, default to 5
                totalItemsCount={props.total}
                onChange={(pageNumber) => props.onChange(pageNumber - 1)} // Subtract 1 to convert to 0-based index
                itemClasss="page-item"
                linkClass="page-link"
                firstPageText={<i className="fa fa-angle-double-left"></i>}
                lastPageText={<i className="fa fa-angle-double-right"></i>}
                prevPageText={<i className="fa fa-angle-left"></i>}
                nextPageText={<i className="fa fa-angle-right"></i>}
                disabledClass="disabled"
                hideDisabled={true}
            />
        )
    )
}

export default definePagination;