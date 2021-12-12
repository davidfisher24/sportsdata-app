import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { retrieveEvents, retrieveSports } from "../actions";
import Loader from './loader.component';
import Error from './error.component'
import "../translations/i18n";

const EventsList = (state) => { 
  const { sports: sportsData, events: eventsData, retrieveEvents, retrieveSports } = state;
  const { sportId } = useParams();
  const { data: events, error: eventsError } = eventsData;
  const { data: sports, error: sportsError } = sportsData;
  const { t } = useTranslation();

  useEffect(() => {
    retrieveEvents(sportId)
    if (!sports) retrieveSports()
    //eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  const findSportTitle = () => {
    if (!sports) return null;
    const sport = sports.find((s) => parseInt(s.id) === parseInt(sportId))
    return sport ? sport.desc || null : null;
  }

  if (eventsError || sportsError) return (<Error />)

  return (
    <div>
      {events ? (
        <div className="list row">
          <div className="col-md-8">
            <h1 className="h4">
              {t("events_list")}
              {findSportTitle() && (
                <span data-testid="sports-title"> - {t(findSportTitle())}</span>
              )}
            </h1>

            <ul className="list-group">
              {events &&
                events.map((event) => (
                  <Link
                    to={"/sports/" + sportId + "/events/" + event.id}
                    key={event.id}
                  >
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      {event.desc}
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sports: state.sports,
    events: state.events,
  };
};


export default connect(mapStateToProps, { retrieveEvents, retrieveSports })(EventsList);
