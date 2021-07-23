import Button from '../common/button'

const HomepageIntro = ({ startDataInput }) => {
    const initializeApp = (e) => {
        startDataInput(e)
        window.location.hash = "next"
    }
    return (
        <section className="homepage-intro offset-top-large transition-in">
            <div className="gc">
                <div className="d-1-7 t-1-13">
                    <h1>Now you can pick all three</h1>
                    <article className="text-block" style={{ maxWidth: '350px' }}>
                        <p><b>You and your data are much better off with Datacom's Object Storage</b></p>
                        <p>Run your numbers through our calculator to see how our best cost solution is fully compromise-free.</p>
                    </article>
                    <div onClick={initializeApp}>
                        <Button 
                            type="primary"
                            text="Begin "
                        />
                    </div>
                </div>
                <div className="d-7-13 t-r-1 t-1-13">
                    <img src="https://seven.co.nz/media/site/3480072874-1626754083/3-balls-final-website-2.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default HomepageIntro;