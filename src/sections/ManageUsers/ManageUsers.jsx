import './ManageUsers.css'
import EnhancedTablbe from '../../components/mui/EnhancedTable.jsx'
import Background2 from '../../components/background2.jsx'
const ManageUsers = () => {
    return (

        <>
            <Background2 />
            <div className='users_padding'>
                <div className="contents">

                    <div className="page_Title">
                        <h4>Manage Users</h4>
                        <div className="page_navigation">
                            <ul>
                                <li>Users</li>
                                <li className='page_navigation-li'> / &nbsp; Manage Users</li>
                            </ul>
                        </div>
                    </div>

                    <div className="manageUsers">
                        <EnhancedTablbe />
                    </div>
                </div>

            </div>
        </>

    )
}

export default ManageUsers
