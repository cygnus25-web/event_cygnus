// Initialize Supabase client
const supabaseUrl = 'https://fgshmyhhvhhinrirsrhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnc2hteWhodmhoaW5yaXJzcmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MTU2MzYsImV4cCI6MjA1OTQ5MTYzNn0.RYnHrp1brgLflB-TvXEle6a2BjeQddbzJGDbA-P8uCM';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// WhatsApp group links
const whatsappGroups = {
  paperPresentation: 'https://chat.whatsapp.com/DV5dsFCkxr847Fbei0t7Uq',
  projectPresentation: 'https://chat.whatsapp.com/Ed8MILFo39C2yUcccZOxBB',
  circuitXplorer: 'https://chat.whatsapp.com/I7luefp9da50u2bjLzF7Cq',
  ampereArena: 'https://chat.whatsapp.com/KXYCBV5gOp1KML88jet07i',
  teslaVsEdison: 'https://chat.whatsapp.com/I0JuHrMBpL99DMdskr3UNJ',
  wattABiryani: 'https://chat.whatsapp.com/IxwZtXZROdYG5k4rMO2VjL',
  fluxYourTalent: 'https://chat.whatsapp.com/LZQo9waQdC65dNcT7awPfU',
  hennaArtistry: 'https://chat.whatsapp.com/Ki4zsf3eIP3JQTkS6sviHa',
  mainGroup: 'https://chat.whatsapp.com/JnxQyoIgDpIGkGnM1wXMSQ'
};

// QR code image paths
const qrCodes = {
  qr1: 'img/qr1.png', // For Watt A Biryani
  qr2: 'img/qr2.png'  // For other events
};

// DOM elements
const form = document.getElementById('registrationForm');
const fluxYourTalentCheckbox = document.getElementById('fluxYourTalent');
const fluxSubEvents = document.getElementById('fluxSubEvents');
const modal = document.getElementById('successModal');
const closeButton = document.querySelector('.close-button');

// Show flux sub-events when Flux Your Talent is checked
fluxYourTalentCheckbox.addEventListener('change', function() {
  if (this.checked) {
    fluxSubEvents.classList.remove('hidden');
  } else {
    fluxSubEvents.classList.add('hidden');
    // Uncheck all sub-event checkboxes
    document.querySelectorAll('