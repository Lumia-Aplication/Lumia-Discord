const moment = require('moment');
moment.locale('pt-BR');

function formatDuration(msValue) {
  const duration = moment.duration(msValue);
  
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  
  const parts = [];
  if (days > 0) parts.push(`${days}D`);
  if (hours > 0) parts.push(`${hours}H`);
  if (minutes > 0) parts.push(`${minutes}M`);
  if (seconds > 0) parts.push(`${seconds}s`);
  
  return parts.join(' e ');
}

module.exports = formatDuration;