import React, { Component } from 'react'

import CharacterBattle from './CharacterBattle/CharacterBattle'
import CharacterEquipment from './CharacterEquipment/CharacterEquipment'
import CharacterInfo from './CharacterInfo/CharacterInfo'
import CharacterTalents from './CharacterTalents/CharacterTalents'
import PlayUI from '../../../Components/UI/PlayUI/PlayUI'
import ShipPlayUI from '../Ship/ShipPlayUI'
import Spinner from '../../../Components/UI/Spinner/Spinner'

import { CharacterConsumer } from '../../../Contexts/CharacterContext'

class CharacterUI extends Component {
  state = {
    currentScreen: 'info',
    ship: {
      general: {
        registry_entry: {
          service_date: '2280',
          designation: 'USS - Excaliber NCC-1705',
          space_frame: 'Constitution',
          mission_profile: 'Multirole Explorer',
          refits: 3
        },
        traits: [
          'Trait 1',
          'Trait 2',
          'Trait 3'
        ],
        launch_bay: [
          'Small Cargo Ship',
          'Runabout',
          'Angry Engineer'
        ]
      },
      stats: {
        systems: {
          engines: { value: 1, breaches: 2 },
          computers: { value: 1, breaches: 2 },
          weapons: { value: 1, breaches: 2 },
          structure: { value: 1, breaches: 2 },
          sensors: { value: 1, breaches: 2 },
          coms: { value: 1, breaches: 2 }
        },
        departments: {
          command: 12,
          security: 12,
          science: 12,
          conn: 12,
          engineering: 12,
          medicine: 12
        },
        scale: 1,
        resistance: 1,
        power: {
          current: 1,
          total: 1
        },
        crew_support: {
          current: 1,
          total: 1
        }
      },
      talents: [],
      battle: {
        weapons: [],
        sheilds: [1,1,1,1,0,0,0,0]
      }
    },
    character: {}
  }

  componentDidMount(){
    const id = this.props.match.params.character_id
    this.props.fetchCharacter(id)
  } 

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.character !== this.props.character){
      this.setState({ character: this.props.character })
    }
  }
  

  handleChangeScreen = (screen) => {
    this.setState({currentScreen: screen})
  }

  render() {
    const { character, ship } = this.state
    let screen = (
      <CharacterInfo 
        attributes={character.attributes} 
        disciplines={character.disciplines}/>
    )

    switch(this.state.currentScreen){
      case 'talents':
        screen = <CharacterTalents talents={character.talents}/>
        break
      case 'battle':
        screen = (
          <CharacterBattle 
            weapons={character.weapons} 
            injuries={character.injuries}/>
        )
        break
      case 'equipment':
        screen = <CharacterEquipment equipment={character.equipment}/>
        break
      case 'ship':
        screen = <ShipPlayUI ship={ship}/>
        break
      default:
        screen =  (
          <CharacterInfo 
            attributes={character.attributes} 
            disciplines={character.disciplines}/>
        )
    }

    if( !character.id ){
      screen = <Spinner />
    }

    return (
      <PlayUI 
        changeUI={this.handleChangeScreen} 
        active={this.state.currentScreen} 
        character={character}
        shipName={ship.general.registry_entry.designation}>
        {screen}
      </PlayUI>
    )
  }
}

const CharacterPlayUI = (props) => (
  <CharacterConsumer>
    {({getCharacter, currentCharacter}) => (
      <CharacterUI {...props} character={currentCharacter} fetchCharacter={getCharacter} />
    )}
  </CharacterConsumer>
)

export default CharacterPlayUI