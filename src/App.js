import React from 'react';
import GroupListContainer from './components/GroupListContainer';
import MainPane from './components/MainPane';
import SongProgressContainer from './components/SongProgressContainer';
import AlbumArtContainer from './components/AlbumArtContainer';
import PlayerControlsContainer from './components/PlayerControlsContainer';
import SectionWrapper from './components/SectionWrapper';

function AppComponent() {

  return  (
    <div className="main-container">
      <div className="row">
        <section className="col-xl-2 stretch">
          <SectionWrapper name="Available Groups">
            <GroupListContainer/>
          </SectionWrapper>
        </section>
        <section className="col-xl-6 stretch">
          <SectionWrapper name="Now Playing">
           <MainPane/>
          </SectionWrapper>
          
        </section>
        <section className="col-xl-4 stretch">
          <SectionWrapper name="Album Art">
            <AlbumArtContainer></AlbumArtContainer>
          </SectionWrapper>
          
        </section>
      </div>
      <div className="row">
        <div className="col-1">
          <PlayerControlsContainer></PlayerControlsContainer>
        </div>
        <div className="col-11">
          <SongProgressContainer></SongProgressContainer>
        </div>
      </div>
    </div>

    )
}

export default AppComponent;