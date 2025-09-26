const api = (path, opts) => fetch(path, opts).then(r=>r.json());

document.getElementById('getAdvice').addEventListener('click', async () => {
  const crop = document.getElementById('crop').value.trim();
  const location = document.getElementById('location').value.trim();
  const out = document.getElementById('adviceOut');
  out.textContent = 'Loading...';
  try {
    const res = await api('/api/advice', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ crop, location })
    });
    if (res.error) out.textContent = 'Error: ' + res.error;
    else out.textContent = `Advice for ${res.crop} (${res.location}):\n\n${res.advice}\n\n${res.weatherHint}`;
  } catch (e) {
    out.textContent = 'Network error';
  }
});

async function refreshListings(){
  const res = await api('/api/listings');
  const list = document.getElementById('listings');
  list.innerHTML = '';
  (res.listings||[]).forEach(l=>{
    const li = document.createElement('li');
    li.textContent = `${l.farmerName} - ${l.crop} (${l.quantity}) - ${l.price} - ${l.location}`;
    list.appendChild(li);
  });
}

document.getElementById('postListing').addEventListener('click', async () => {
  const farmerName = document.getElementById('farmerName').value.trim();
  const crop = document.getElementById('mCrop').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const price = document.getElementById('price').value.trim();
  const res = await api('/api/listings', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ farmerName, crop, quantity, price })
  });
  if (res.error) alert('Error: ' + res.error);
  else {
    alert('Listing posted');
    document.getElementById('farmerName').value=''; document.getElementById('mCrop').value=''; document.getElementById('quantity').value=''; document.getElementById('price').value='';
    refreshListings();
  }
});

document.getElementById('sendSms').addEventListener('click', async () => {
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  const el = document.getElementById('smsStatus');
  el.textContent = 'Sending...';
  const res = await api('/api/send-sms', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ phone, message })
  });
  if (res.error) el.textContent = 'Error: ' + res.error;
  else el.textContent = 'SMS queued (placeholder)';
});

// initial load
refreshListings();
