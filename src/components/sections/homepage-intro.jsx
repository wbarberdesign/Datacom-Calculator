import Button from '../common/button'

const HomepageIntro = ({ startCalculator }) => {
    return (
        <section className="homepage-intro offset-top-large transition-in">
            <div className="gc">
                <div className="d-1-7">
                    <h1>Now you can pick all three</h1>
                    <article className="text-block">
                        <p><b>You and your data are much better off with Datacom's object storage</b></p>
                        <p>Run your numbers through our calculator to see how our best cost solution is fully compromise-free.</p>
                    </article>
                    <div onClick={startCalculator}>
                        <Button 
                            type="primary"
                            text="Begin"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomepageIntro;