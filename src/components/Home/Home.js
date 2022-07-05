import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_LIST_ITEM_ACTION } from '../../reduxUtils'
import AddJobDetails from '../AddJobDetails/AddJobDetails'
import './Home.css'

const statusBg = (status) => {
  switch (status) {
    case 'applied':
      return 'bg-primary'
    case 'rejected':
      return 'bg-danger'
    case 'interviewed':
      return 'bg-dark'
    case 'accepted':
      return 'bg-success'
    default:
      return 'bg-secondary'
  }
}

const Home = () => {
  const [addPage, showAddPage] = useState(false)
  const [editData, setEditData] = useState({})

  const closeAddPage = () => {
    showAddPage(false)
    setEditData({})
  }

  const initiateEdit = (data) => {
    setEditData(data)
    showAddPage(true)
  }

  return (
    <>
      {!addPage && <HomeContent initiateEdit={initiateEdit} />}
      {addPage && (
        <AddJobDetails editData={editData} closeAddPage={closeAddPage} />
      )}
      <button
        style={{ height: '50px', width: '50px', fontSize: '15px' }}
        className="addBtn btn btn-outline-info rounded-circle"
        onClick={() => {
          showAddPage(!addPage)
        }}
      >
        {addPage ? '❌' : '➕'}
      </button>
    </>
  )
}

const HomeContent = (props) => {
  const applicationList = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div className="Home">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Job Id</th>
            <th scope="col">Company</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Additional Info</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicationList.map((data, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.jobId}</td>
                <td>{data.companyName}</td>
                <td>{data.role}</td>
                <td>
                  <div
                    className={`p-1 w-75 text-center text-light ${statusBg(
                      data.status
                    )}`}
                  >
                    {data.status.toUpperCase()}
                  </div>
                </td>
                <td>{data.additionalInfo}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => {
                      props.initiateEdit(data)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      dispatch({
                        type: DELETE_LIST_ITEM_ACTION,
                        payload: data.jobId,
                      })
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
