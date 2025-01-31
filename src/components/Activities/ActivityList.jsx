import React from 'react';
import ActivityItem from './ActivityItem';

export default function ActivityList({ activities, clients, onUpdate }) {
  return (
    <section className="md:col-span-2">
      <h2 className="text-lg font-semibold mb-4">Attività Programmate</h2>
      <div className="space-y-3">
        {activities.map(activity => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            clients={clients}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </section>
  );
}