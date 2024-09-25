import Sidebar from '../../layout/sidebar/Sidebar'
import styles from './Dashboard.module.css'

function Dashboard() {
    return (
        <>
            <Sidebar currentPageName={'/dashboard'} />

            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <h3>Dashboard</h3>

                    
                </div>
            </div>
        </>
    )
}

export default Dashboard