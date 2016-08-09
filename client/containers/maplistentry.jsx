import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index.js';
import moment from 'moment';
import { Image } from 'react-bootstrap';


class MapListEntry extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    // this.handleOut = this.handleOut.bind(this);
  }

  handleEnter(e) {
    e.preventDefault();
    const selectedEvent = this.props.allEvents.find((event) => {
      return event.id === this.props.index;
    });
    // action creator that sets current selection
    this.props.selectEvent(selectedEvent);
  }

  // Interprets db location string and breaks into street and city, state.
  formatAddress(address, str) {
    const formattedAddress = address.split(',');
    const streetAddress = formattedAddress.splice(0, 1);
    const cityAddress = formattedAddress.join('');

    if (str === 'street') {
      return streetAddress;
    }
    return cityAddress;
  }

  // Interprets db time string and breaks into date and time.
  formatTime(time, str) {
    const formattedTime = time.split(',');
    const eventDate = formattedTime.splice(0, 1);
    const eventTime = formattedTime.join('');

    if (str === 'time') {
      return eventTime;
    }
    return eventDate;
  }

  render() {
    const startTime = moment(this.props.selectedEvent.startDatetime).format('MMMM Do YYYY, h:mm a');
    const endTime = moment(this.props.selectedEvent.endDatetime).format('MMMM Do YYYY, h:mm a');
    return (

      <div
        id="f1_container"
        className={this.props.entryClass}
      >
        <div
          id="f1_card"
          onClick={this.props.openModal}
          key={this.props.key}
          index={this.props.index}
          onMouseEnter={this.handleEnter}
        >
          <div className="front face">
            <img
              src={this.props.image}
              className="list-image"
              role="presentation"
            />
            <div className="price-banner">
              <div className="event-price">
                $ {this.props.price}
              </div>
              <div className="chef-rating-container">
                <div className="chef-rating">
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                </div>
              </div>
            </div>
          </div>
          <div className="back face center">
            <div className="event-name">
              <strong>{this.props.eventName}</strong>
            </div>
            <div className="street-address">
              {this.formatAddress(this.props.address, 'street')}
            </div>
            <div className="city-address">
              {this.formatAddress(this.props.address)}
            </div>
            <div className="event-time">
              {this.formatTime(startTime, 'time')} -
              {this.formatTime(endTime, 'time')}
            </div>
            <div className="event-date">
              {this.formatTime(startTime)}
            </div>
            <div className="event-description">
              {this.props.description}
            </div>
            <div className="event-maxGuests">
              Max Guests: {this.props.maxGuests}
            </div>
            <div className="chef-container">
              <Image
                className="chef-photo"
                src="../assets/stock-chef.jpg"
                circle
              />
              <div className="chef-rating-container">
                <div className="chef-rating">
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allEvents: state.allEvents,
    selectedEvent: state.selectedEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapListEntry);
