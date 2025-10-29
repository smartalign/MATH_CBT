import './AddQuestion.css';
import EnhancedTablbe from '../../components/mui/EnhancedTable.jsx'
import Background2 from '../../components/background2.jsx'
const AddQuestion = () => {
    return (

        <>
            <Background2 />
            <div className='users_padding'>
                <div className="contents">

                    <div className="page_Title">
                        <h4>Add question</h4>
                        <div className="page_navigation">
                            <ul>
                                <li>Manage Exam</li>
                                <li className='page_navigation-li'> / &nbsp; Add Question</li>
                            </ul>
                        </div>
                    </div>

                    <div className="addQuestion">

                    </div>
                </div>

            </div>
        </>

    )
}

export default AddQuestion
