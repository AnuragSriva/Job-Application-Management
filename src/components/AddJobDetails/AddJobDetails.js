import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_LIST_ITEM_ACTION, EDIT_LIST_ITEM_ACTION } from '../../reduxUtils'
import './AddJobDetails.css'

const applicationFormFields = [
  'jobId',
  'companyName',
  'role',
  'status',
  'additionalInfo',
]

const defaultState = applicationFormFields.reduce((acc, curr) => {
  acc[curr] = ''
  return acc
}, {})

const AddJobDetails = (props) => {
  const hasEditData = () => Object.keys(props.editData).length > 0

  const [formState, setFormState] = useState(
    hasEditData() ? props.editData : defaultState
  )

  const dispatch = useDispatch()

  const handleFieldUpdate = (field, value) => {
    setFormState({ ...formState, [`${field}`]: value })
  }

  const handleSubmit = () => {
    if (hasEditData()) {
      dispatch({
        type: EDIT_LIST_ITEM_ACTION,
        payload: { jobId: formState.jobId, updatedData: formState },
      })
    } else {
      dispatch({ type: ADD_LIST_ITEM_ACTION, payload: formState })
    }
    props.closeAddPage()
  }

  return (
    <div className="add-job-details-wrapper row">
      <div className="col-md-2 h-100 bg-primary text-center">
        <button className="btn btn-secondary mt-3" onClick={props.closeAddPage}>
          ⬅ Go Back
        </button>
      </div>
      <div className="col px-4">
        <p className="h4 my-4">Add Job Details</p>

        <form>
          {applicationFormFields.map((field) => {
            return (
              <div key={field} className="form-group my-2">
                <label className="ml-2" htmlFor="{field}">
                  {field}
                </label>
                <input
                  disabled={hasEditData() && field === 'jobId'}
                  className="form-control"
                  value={formState[field]}
                  onChange={(e) => handleFieldUpdate(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                />
              </div>
            )
          })}
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary rounded mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddJobDetails
