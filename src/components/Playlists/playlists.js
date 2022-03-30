import React from "react";
import TrackList from "../TrackList/TrackList";
import "./playlists.css";


class Playlists extends React.Component {
   
    render() {
        return (
            <div className="Playlists">
                <h2>Your Playlists</h2>
                <TrackList different={true} tracks={this.props.results}/>
                <button onClick={this.props.yourPlaylists} className="getPlaylists">Get Your Playlists</button>
            </div>
        )
    }
}

export default Playlists;