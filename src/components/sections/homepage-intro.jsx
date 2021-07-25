import Button from '../common/button'

const HomepageIntro = ({ startDataInput }) => {
    const initializeApp = (e) => {
        startDataInput(e)
        window.location.hash = "next"
    }
    return (
        <section className="homepage-intro offset-top-large offset-bottom-medium transition-in">
            <div className="gc">
                <div className="d-1-7 t-1-13">
                    <h1>Now you can pick all three.</h1>
                    <article className="text-block" style={{ maxWidth: '350px' }}>
                        <p><b>You and your data are much better off with Datacom’s object storage.</b></p>
                        <p>Run your numbers through our calculator to see how the best cost solution is fully compromise-free.</p>
                    </article>
                    <div onClick={initializeApp}>
                        <Button 
                            type="primary"
                            text="Begin "
                        />
                    </div>
                </div>
                <div className="d-7-13 t-r-1 t-1-13">
                    <img src="/ballz.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default HomepageIntro;