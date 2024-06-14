import React, { useState, useEffect } from "react";
import gradientbg from "../assets/images/banner/vector2.png";
import { Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config"; 

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [postTime, setPostTime] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/jobs`);
        const result = await response.json();
        if (response.ok) {
          setJobs(result.data);
          setFilteredJobs(result.data); // Initialize filteredJobs with all jobs
        } else {
          console.error('Error fetching data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [minBudget, maxBudget, postTime, selectedSkills]);

  const applyFilters = () => {
    let filtered = jobs;

    // Filter by budget
    if (minBudget) {
      filtered = filtered.filter(job => job.payAmount >= minBudget);
    }
    if (maxBudget) {
      filtered = filtered.filter(job => job.payAmount <= maxBudget);
    }

    // Filter by post time
    if (postTime) {
      const now = new Date();
      filtered = filtered.filter(job => {
        const postedDate = new Date(job.startDate.split('-').reverse().join('-'));
        const timeDifference = now - postedDate;
        switch (postTime) {
          case 'lastHour':
            return timeDifference <= 3600000;
          case 'last24Hours':
            return timeDifference <= 86400000;
          case 'lastWeek':
            return timeDifference <= 604800000;
          default:
            return true;
        }
      });
    }

    // Filter by skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(job => selectedSkills.includes(job.workType.toLowerCase()));
    }

    setFilteredJobs(filtered);
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter(skill => skill !== value));
    }
  };

  const timeSince = (date) => {
    const now = new Date();
    const postedDate = new Date(date.split('-').reverse().join('-')); // Parse "DD-MM-YYYY" format
    const seconds = Math.floor((now - postedDate) / 1000);

    let interval = Math.floor(seconds / 3600);
    if (interval > 24) {
      const days = Math.floor(interval / 24);
      return days > 1 ? `${days} days ago` : '1 day ago';
    }
    if (interval >= 1) {
      return interval > 1 ? `${interval} hours ago` : '1 hour ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval > 1 ? `${interval} minutes ago` : '1 minute ago';
    }
    return `${seconds} seconds ago`;
  };

  return (
    <div
      className="h-full flex flex-col justify-center py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gradientbg})` }}
    >
      <Row>
        <Col
          md="7"
          className="overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          <div className="ml-20">
            {filteredJobs.map((job) => (
              <Col key={job._id} sm="11" className="mb-4">
                <div className="border rounded-md px-4 py-2">
                  <div className="flex justify-between">
                    <h1>{job.workType} Needed</h1>
                    <Button
                      style={{
                        backgroundColor: "#12002E",
                        height: "40px",
                        width: "120px",
                      }}
                      onClick={() => navigate(`/job-details/${job._id}`)}
                    >
                      Bid Now
                    </Button>
                  </div>
                  <div className="flex justify-between">
                    <p className="mb-1">{job.address}</p>
                    <p>{job.bidded_sp_ids.length} people bidded</p>
                  </div>
                  <p className="mb-1">{job.shortTitle}</p>
                  <p className="font-bold">
                    posted {timeSince(job.startDate)} by Amir Khan
                  </p>
                </div>
              </Col>
            ))}
          </div>
        </Col>
        <Col md="5" className="p-5">
          <div className="bg-white rounded-md shadow-md p-4">
            <h3>Filter By</h3>
            <div className="mt-4">
              <label htmlFor="budget" className="mb-2">
                Budget:
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="minBudget"
                  placeholder="Min"
                  className="mr-2 border rounded-md px-2 py-1"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                />
                <input
                  type="number"
                  id="maxBudget"
                  placeholder="Max"
                  className="border rounded-md px-2 py-1"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="postTime" className="mr-4">
                Post Time:
              </label>
              <select
                id="postTime"
                className="border rounded-md px-2 py-1"
                value={postTime}
                onChange={(e) => setPostTime(e.target.value)}
              >
                <option value="">Select</option>
                <option value="lastHour">Last Hour</option>
                <option value="last24Hours">Last 24 Hours</option>
                <option value="lastWeek">Last Week</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="skill" className="mb-2">Skill:</label>
              <div
                id="skill"
                className="rounded-md px-2 py-1 overflow-y-scroll"
                style={{ maxHeight: "200px" }}
              >
                <label className="block mb-1">
                  <input type="checkbox" value="plumbing" onChange={handleSkillChange} /> Plumbing
                </label>
                <label className="block mb-1">
                  <input type="checkbox" value="electrician" onChange={handleSkillChange} /> Electrician
                </label>
                <label className="block mb-1">
                  <input type="checkbox" value="gardening" onChange={handleSkillChange} /> Gardening
                </label>
                <label className="block mb-1">
                  <input type="checkbox" value="painter" onChange={handleSkillChange} /> Painter
                </label>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AvailableJobs;
