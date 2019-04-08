import React from 'react'
import MovieDBLogo from '../assets/the-movie-db.png'

class AboutComponent extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>About</h4>
                </div>

                <div style={{ fontSize: '20px', color: 'gray', padding: 150, textAlign: 'left' }}>
                    <p>
                        Movies App is a personal project, the app's data are fetched from The Movie DB API: <br />
                        - Search movies from The Movie DB API. <br />
                        - Bookmark. <br />
                        - Add to plan. <br />
                        - Rated. <br />
                        - See Latest, Trending, Upcoming and Popular<br />
                        Built using HTML, CSS, JavaScript, ReactJs, Redux, React-router, Bootstrap, Restful API, and other libraries
                    </p>
                    <span>By </span> <a target='__blank' href='https://talalalamdar.surge.sh'> Talal Alamdar</a><br /> <br />
                    <img src={MovieDBLogo} alt='movie-db-logo' width={'10%'} />
                </div>
            </React.Fragment>
        )
    }
}

export default AboutComponent