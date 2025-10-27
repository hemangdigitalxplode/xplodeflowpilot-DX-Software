import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import  Barchart from '../components/Barchart'

const Efficiency = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <div className="p-4">
                    <h3>Efficiency Mechanism</h3>
                    <div className="mt-3">
                        <div className="row g-3 align-items-end">
                            <div className="col-md-4 col-sm-12">
                                <label htmlFor="search" className="form-label fw-semibold">Search</label>
                                <input
                                    type="text"
                                    id="search"
                                    className="form-control"
                                    placeholder="Search by name, ID, or keyword"
                                />
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <label htmlFor="month" className="form-label fw-semibold">Select Month</label>
                                <input
                                    type="month"
                                    id="month"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <label htmlFor="fromDate" className="form-label fw-semibold">From Date</label>
                                <input
                                    type="date"
                                    id="fromDate"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <label htmlFor="toDate" className="form-label fw-semibold">To Date</label>
                                <input
                                    type="date"
                                    id="toDate"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-1 col-sm-6">
                                <button type="button" className="btn btn-primary w-100">Filter</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 row">
                        <div className="col-md-4 col-sm-12 mb-4">

                            <div className="card shadow-sm p-3 mb-4 text-center">
                                <h6 className="text-center mb-3">Efficiency (October 2025)</h6>
                                <div
                                    className="position-relative d-flex justify-content-center align-items-center"
                                    style={{ height: "150px" }}
                                >
                                    <svg width="120" height="120">
                                        <circle cx="60" cy="60" r="50" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            stroke="#28a745"
                                            strokeWidth="10"
                                            fill="none"
                                            strokeDasharray="314"
                                            strokeDashoffset="78"
                                            transform="rotate(-90 60 60)"
                                            style={{ transition: "stroke-dashoffset 0.5s ease" }}
                                        />
                                    </svg>
                                    <div className="position-absolute">
                                        <h5 className="mb-0 fw-bold text-success">75%</h5>
                                    </div>
                                </div>
                                <p className="text-muted small mb-0">Keep up the great work this month 💪</p>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <div className="card shadow-sm p-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 className="fw-semibold mb-1">Punctuality</h6>
                                            <p className="text-muted small mb-0">This Week</p>
                                        </div>
                                        <div className="position-relative" style={{ width: "60px", height: "60px" }}>
                                            <svg width="60" height="60">
                                                <circle cx="30" cy="30" r="25" stroke="#e6e6e6" strokeWidth="6" fill="none" />
                                                <circle
                                                    cx="30"
                                                    cy="30"
                                                    r="25"
                                                    stroke="#ffc107" // Yellow tone for punctuality
                                                    strokeWidth="6"
                                                    fill="none"
                                                    strokeDasharray="157"
                                                    strokeDashoffset="39" // ~75% progress
                                                    transform="rotate(-90 30 30)"
                                                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                                                />
                                            </svg>
                                            <div
                                                className="position-absolute top-50 start-50 translate-middle text-warning fw-bold small"
                                            >
                                                75%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-sm p-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h6 className="fw-semibold mb-1">Productivity</h6>
                                            <p className="text-muted small mb-0">Last Month</p>
                                        </div>
                                        <div className="position-relative" style={{ width: "60px", height: "60px" }}>
                                            <svg width="60" height="60">
                                                <circle cx="30" cy="30" r="25" stroke="#e6e6e6" strokeWidth="6" fill="none" />
                                                <circle
                                                    cx="30"
                                                    cy="30"
                                                    r="25"
                                                    stroke="#28a745" // Green tone for productivity
                                                    strokeWidth="6"
                                                    fill="none"
                                                    strokeDasharray="157"
                                                    strokeDashoffset="63" // ~60% progress
                                                    transform="rotate(-90 30 30)"
                                                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                                                />
                                            </svg>
                                            <div
                                                className="position-absolute top-50 start-50 translate-middle text-success fw-bold small"
                                            >
                                                60%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* char start here */}

                        <div className='col-md-8 col-sm-12 mb-4'>
                            <Barchart/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Efficiency;