import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'; // Import CSS file
import 'dhtmlx-gantt/codebase/dhtmlxgantt'; // Import dhtmlxGantt library

const GanttChart = () => {
  useEffect(() => {
    // Initialize Gantt chart if dhtmlxGantt library is loaded
    if (window.gantt) {
      // Configure Gantt chart
      window.gantt.config.xml_date = "%Y-%m-%d %H:%i";
      window.gantt.init("gantt_container");

      // Define Gantt chart data
      const data = [
        { id: 1, text: "Task #1", start_date: "2024-04-01 00:00", duration: 3, progress: 0.6 },
        { id: 2, text: "Task #2", start_date: "2024-04-02 00:00", duration: 4, progress: 0.4 },
        { id: 3, text: "Task #3", start_date: "2024-04-03 00:00", duration: 5, progress: 0.2 },
        { id: 4, text: "Task #4", start_date: "2024-04-04 00:00", duration: 2, progress: 0.8 },
        { id: 5, text: "Task #5", start_date: "2024-04-05 00:00", duration: 3, progress: 0.5 },
        { id: 6, text: "Task #6", start_date: "2024-04-06 00:00", duration: 4, progress: 0.3 }
      ];

      // Parse and load data into Gantt chart
      window.gantt.parse({ data });

      return () => {
        // Clean up when the component unmounts
        window.gantt.clearAll();
      };
    } else {
      console.error('dhtmlxGantt library not found.');
    }
  }, []);

  return (
    <div id="gantt_container" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default GanttChart;
