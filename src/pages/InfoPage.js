import React from "react";
import PropTypes from "prop-types";
import FullNote from "../components/FullNote";
import { getNote, deleteNote} from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";

function InfoPageWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    function onDeleteHandler(id) {
      deleteNote(id);
      navigate("/");
    }
    return <InfoPage id={id} onDelete={onDeleteHandler} />;
  }
  
  class InfoPage extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        note: null,
      };
    }
  
    async componentDidMount() {
      const note = await getNote(this.props.id);
  
      this.setState(() => {
        return {
          note: note.data,
        };
      });
    }
    render(){
        
        return (
            <section className="detail-page">
                <FullNote {...this.state.note} 
                onDelete={this.state.onDelete} />
            </section>
        )
    }
}

InfoPage.propTypes = {
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default InfoPageWrapper;