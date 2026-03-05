-- Seed products with stable Unsplash image URLs
INSERT INTO products (name, name_hi, description, description_hi, price, original_price, category, sizes, colors, images, rating, review_count, is_bestseller, material, material_hi) VALUES
(
  'Everyday Cotton Comfort Bra',
  'रोज़ाना कॉटन कम्फर्ट बॉडी',
  'Ultra-soft cotton bra with gentle support for daily wear. Wire-free design ensures all-day comfort.',
  'रोज़ाना पहनने के लिए बेहद मुलायम कॉटन बॉडी। बिना तार का डिज़ाइन पूरे दिन आराम देता है।',
  499, 799, 'bras',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Skin', 'Black', 'White', 'Pink'],
  ARRAY[
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop'
  ],
  4.5, 128, true,
  '100% Organic Cotton',
  '100% ऑर्गेनिक कॉटन'
),
(
  'Lace Trim Kachhi Panty Set (3-Pack)',
  'लेस ट्रिम कच्छी सेट (3 का पैक)',
  'Elegant lace-trimmed panties in a convenient 3-pack. Breathable cotton blend for everyday freshness.',
  'सुंदर लेस-ट्रिम कच्छी 3 के पैक में। रोज़ की ताज़गी के लिए सांस लेने योग्य कॉटन ब्लेंड।',
  399, 599, 'panties',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Assorted Pastels', 'Classic Black', 'Pure White'],
  ARRAY[
    'https://images.unsplash.com/photo-1617331140180-e8262094733a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=600&fit=crop'
  ],
  4.2, 95, false,
  'Cotton Lycra Blend',
  'कॉटन लाइक्रा ब्लेंड'
),
(
  'Silk Touch Nightgown',
  'सिल्क टच नाइटगाउन',
  'Luxurious satin-finish nightgown with adjustable straps. Perfect for a restful and elegant night.',
  'एडजस्टेबल स्ट्रैप्स के साथ शानदार सैटिन-फिनिश नाइटगाउन। आरामदायक और सुंदर रात के लिए।',
  899, 1499, 'nightwear',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Blush Pink', 'Midnight Blue', 'Ivory'],
  ARRAY[
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=600&fit=crop'
  ],
  4.8, 210, true,
  'Premium Satin',
  'प्रीमियम सैटिन'
),
(
  'Matching Bra & Panty Set',
  'मैचिंग बॉडी और कच्छी सेट',
  'Coordinated lingerie set with comfortable bra and matching panty. Available in beautiful colors.',
  'आरामदायक बॉडी और मैचिंग कच्छी का कोऑर्डिनेटेड सेट। खूबसूरत रंगों में उपलब्ध।',
  799, 1299, 'sets',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Red & Black', 'Pink & White', 'Navy & Gold'],
  ARRAY[
    'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=600&fit=crop'
  ],
  4.6, 175, true,
  'Cotton Satin Mix',
  'कॉटन सैटिन मिक्स'
),
(
  'High-Waist Cotton Kachhi (5-Pack)',
  'हाई-वेस्ट कॉटन कच्छी (5 का पैक)',
  'Full coverage high-waist panties in a value 5-pack. Super soft cotton with gentle elastic for all-day comfort.',
  'वैल्यू 5 पैक में फुल कवरेज हाई-वेस्ट कच्छी। पूरे दिन आराम के लिए मुलायम कॉटन।',
  599, 999, 'panties',
  ARRAY['M', 'L', 'XL', 'XXL', '3XL'],
  ARRAY['Multicolor Pack', 'All Black', 'Skin Tones'],
  ARRAY[
    'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop'
  ],
  4.3, 312, true,
  '100% Combed Cotton',
  '100% कॉम्ब्ड कॉटन'
),
(
  'Sports Comfort Bra',
  'स्पोर्ट्स कम्फर्ट बॉडी',
  'Medium-support sports bra with moisture-wicking fabric. Ideal for yoga, walking, and light exercise.',
  'मॉइश्चर-विकिंग फैब्रिक के साथ मीडियम-सपोर्ट स्पोर्ट्स बॉडी। योगा और हल्की एक्सरसाइज़ के लिए।',
  649, 999, 'bras',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Black', 'Grey', 'Coral'],
  ARRAY[
    'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop'
  ],
  4.7, 89, false,
  'Polyester Spandex Blend',
  'पॉलिएस्टर स्पैन्डेक्स ब्लेंड'
),
(
  'Cozy Pajama Set',
  'कोज़ी पजामा सेट',
  'Soft cotton pajama set with comfortable top and matching bottoms. Perfect for lounging and sleeping.',
  'आरामदायक टॉप और मैचिंग बॉटम के साथ मुलायम कॉटन पजामा सेट। आराम और नींद के लिए।',
  1099, 1799, 'nightwear',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Lavender', 'Peach', 'Sky Blue'],
  ARRAY[
    'https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop'
  ],
  4.9, 156, true,
  'Brushed Cotton',
  'ब्रश्ड कॉटन'
),
(
  'T-Shirt Bra - Seamless',
  'टी-शर्ट बॉडी - सीमलेस',
  'Invisible under clothing with smooth seamless cups. Lightly padded for a natural shape.',
  'स्मूद सीमलेस कप के साथ कपड़ों के नीचे अदृश्य। प्राकृतिक शेप के लिए हल्की पैडिंग।',
  549, 899, 'bras',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Skin', 'Black', 'White'],
  ARRAY[
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=600&h=600&fit=crop'
  ],
  4.4, 203, false,
  'Nylon Spandex',
  'नायलॉन स्पैन्डेक्स'
);

-- Seed some reviews
INSERT INTO reviews (product_id, author, rating, comment, created_at) VALUES
(1, 'Priya M.', 5, 'So comfortable! I wear this every day. The cotton is very soft and breathable.', NOW() - INTERVAL '30 days'),
(1, 'Anita K.', 4, 'Good quality for the price. Wish there were more color options.', NOW() - INTERVAL '20 days'),
(1, 'Fatima S.', 5, 'Best everyday bra I have found. No irritation at all!', NOW() - INTERVAL '10 days'),
(2, 'Rekha D.', 4, 'Nice lace work, comfortable fit. The 3-pack is great value.', NOW() - INTERVAL '25 days'),
(2, 'Sunita P.', 5, 'Beautiful and comfortable. My daughters also loved them!', NOW() - INTERVAL '15 days'),
(3, 'Meena R.', 5, 'Feels so luxurious! The fabric is amazing quality.', NOW() - INTERVAL '22 days'),
(3, 'Kavita L.', 4, 'Very pretty and comfortable. Runs slightly large.', NOW() - INTERVAL '12 days'),
(3, 'Zara N.', 5, 'I bought this as a gift and she absolutely loved it!', NOW() - INTERVAL '5 days'),
(4, 'Pooja T.', 5, 'Perfect matching set. The quality is excellent for the price.', NOW() - INTERVAL '18 days'),
(4, 'Deepa G.', 4, 'Beautiful colors and very comfortable. Highly recommend!', NOW() - INTERVAL '8 days'),
(5, 'Lakshmi V.', 5, 'These are the most comfortable panties I have ever worn. Ordering more!', NOW() - INTERVAL '28 days'),
(5, 'Radha B.', 4, 'Great value pack. Good quality cotton that lasts after many washes.', NOW() - INTERVAL '14 days'),
(6, 'Neha S.', 5, 'Perfect for my morning walks. Great support without discomfort.', NOW() - INTERVAL '16 days'),
(7, 'Aarti M.', 5, 'So soft and cozy! I never want to take these off.', NOW() - INTERVAL '9 days'),
(8, 'Shalini K.', 4, 'Truly seamless - invisible under my t-shirts. Very happy!', NOW() - INTERVAL '7 days');
