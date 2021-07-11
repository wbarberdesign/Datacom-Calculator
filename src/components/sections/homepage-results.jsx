const HomepageResults = ({transitionIn, totalDataTB, totalAPIRequests, totalInEgress, singleOrDuo, selectedCountry}) => {
return (
    <section class={`homepage-results offset-top-large ${transitionIn}`}>
        <div className="gc">
            <div className="d-1-10">
                <h2>Your Results:</h2>
                <h3 className="x-large light-blue">$7,716</h3>
                <article class="offset-top-medium">
                    <b>Total Data (TB)</b>
                    <p>{totalDataTB}</p>
                    <b>Total API Requests</b>
                    <p>{totalAPIRequests}</p>
                    <b>Total In/ Egress</b>
                    <p>{totalInEgress}</p>
                    <b>Single or Multi</b>
                    <p>{singleOrDuo}</p>
                    <b>Selected Country</b>
                    <p>{selectedCountry}</p>
                </article>
            </div>
        </div>
    </section>
)
}

export default HomepageResults;