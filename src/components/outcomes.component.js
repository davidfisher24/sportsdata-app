import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { retrieveOutcomes, retrieveEvents } from "../actions";
import Loader from './loader.component'
import Error from './error.component'
import "../translations/i18n";

const OutcomesList = (state) => { 
  const { events: eventsData, outcomes: outcomesData, retrieveOutcomes, retrieveEvents } = state;
  const { data: outcomes, error: outcomesError } = outcomesData;
  const { data: events, error: eventsError } = eventsData;
  const { sportId, eventId } = useParams();
  
  const { t } = useTranslation();

  useEffect(() => {
    retrieveOutcomes(sportId, eventId)
    if (!events) retrieveEvents()
    //eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  const findEventTitle = () => {
    if (!events) return null;
    const event = events.find((e) => parseInt(e.id) === parseInt(eventId))
    return event ? event.desc || null : null;
  }

  if (eventsError || outcomesError) return (<Error />)

  return (
    <div>
      {outcomes ? (
        <div className="list row">
          <div className="col-md-8">
            <h1 className="h4">
              {t("outcomes_list")}
              {findEventTitle() && (
                <span data-testid="event-title"> - {t(findEventTitle())}</span>
              )}
            </h1>

            <ul className="list-group">
              {outcomes &&
                outcomes.map((outcome) => (
                  <div 
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    key={outcome.cpid}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        {outcome.d}
                      </h5>
                      <small>{outcome.pr}</small>
                    </div>
                    {outcome.keyDimension && (
                      <p className="mb-1" data-testid="key-dimension">{
                        t(outcome.keyDimension.toLowerCase())
                      }</p>
                    )}
                    <small>{outcome.pr} - {outcome.fdp}</small>
                  </div>
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
    events: state.events,
    outcomes: state.outcomes,
  };
};


export default connect(mapStateToProps, { retrieveOutcomes, retrieveEvents })(OutcomesList);
