import React from "react";
import PropTypes from "prop-types";
//import { getActiveNotes } from "../utils/local-data";
import {getActiveNotes, deleteNote} from "../utils/api"
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
import NoteList from "../components/NoteList";



function HomePageWrapper ()  {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');

    function changeSeachParams(keyword) {
        setSearchParams({keyword});
    }

    return <HomePage defaultKeyword={keyword} keyword={changeSeachParams} />

}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            keyword: props.defaultKeyword || '',
        }

        getActiveNotes().then(({data}) =>{
            this.setState(() => {
                return{
                    notes:data
                }
            })
        })

        this.onKeywordHandler = this.onKeywordHandler.bind(this);
   }

   async componentDidMount() {
    const { data } = await getActiveNotes();
    
    this.setState(() => {
      return {
        notes: data
      }
    })
  }

  async onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getActiveNotes();
    this.setState(() => {
      return {
        notes: data,
      };
    });
  }
    onKeywordHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            }
        });
    }

    render() {
        const notes = this.state.notes.filter((notes) => {
            return notes.title.toLocaleLowerCase().includes(
                this.state.keyword.toLocaleLowerCase(),
            )
        });
        return (
            <section className="homepage">
                <h2>Catatan Aktif</h2>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordHandler} />
                <NoteList notes={notes} />
                <AddButton />
            </section>
        )
    }
    
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
}


export default HomePageWrapper;