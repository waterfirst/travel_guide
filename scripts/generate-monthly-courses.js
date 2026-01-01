const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// 현재 월 정보
const now = new Date();
const currentMonth = now.getMonth() + 1; // 1-12
const currentYear = now.getFullYear();
const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const currentMonthName = monthNames[currentMonth - 1];

async function generateMonthlyCourses() {
  console.log(`\n🗓️  ${currentYear}년 ${currentMonthName} 여행 가이드 생성 시작...\n`);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `당신은 경기도 여행 전문가입니다. ${currentYear}년 ${currentMonthName}에 적합한 경기도 여행 코스 20개를 생성해주세요.

**요구사항:**
1. 4가지 타입별로 각 5개씩 총 20개 코스:
   - bonfire: 퇴근 후 불멍 (친구 2-3명, 당일치기)
   - spa-day: 부모님과 온천 (당일치기)
   - spa-overnight: 1박2일 온천 힐링
   - solo-drive: 혼자 드라이브

2. ${currentMonthName} 날씨와 계절에 맞는 장소를 선택하세요
3. 실제 존재하는 경기도 지역을 선택하세요
4. 각 코스는 Unsplash 이미지 URL을 포함해야 합니다

**JSON 형식으로만 응답하세요:**

\`\`\`json
[
  {
    "id": "bonfire-1",
    "type": "bonfire",
    "title": "코스 제목",
    "description": "코스 설명",
    "thumbnail": "https://images.unsplash.com/photo-xxxxx?w=800&q=80",
    "duration": "3-4시간",
    "distance": 65,
    "estimatedCost": {
      "min": 30000,
      "max": 50000
    },
    "itinerary": [
      {
        "order": 1,
        "location": {
          "name": "장소명",
          "address": "경기도 시군구 상세주소",
          "lat": 37.xxx,
          "lng": 127.xxx,
          "parkingInfo": "주차 정보",
          "entryFee": 0
        },
        "activity": "활동",
        "duration": "2시간",
        "cost": 30000,
        "description": "상세 설명"
      }
    ],
    "restaurants": ["restaurant-1", "restaurant-2"],
    "accommodations": ["accommodation-1"],
    "bestWeather": ["clear", "cloudy"],
    "tags": ["태그1", "태그2", "태그3"],
    "createdAt": "${new Date().toISOString()}",
    "updatedAt": "${new Date().toISOString()}"
  }
]
\`\`\`

JSON만 출력하세요. 다른 텍스트는 포함하지 마세요.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // JSON 추출
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const courses = JSON.parse(text);

    // 파일 저장
    const dataDir = path.join(__dirname, '..', 'data');
    fs.writeFileSync(
      path.join(dataDir, 'courses.json'),
      JSON.stringify(courses, null, 2),
      'utf8'
    );

    console.log(`✅ ${courses.length}개 코스 생성 완료!`);
    console.log(`📁 저장 위치: data/courses.json\n`);

    return courses;
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    throw error;
  }
}

// 맛집 데이터 생성
async function generateRestaurants(courses) {
  console.log('🍽️  맛집 데이터 생성 중...\n');

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `경기도 ${currentMonthName} 추천 맛집 30개를 JSON 형식으로 생성해주세요.

JSON만 출력하세요:
\`\`\`json
[
  {
    "id": "restaurant-1",
    "name": "맛집 이름",
    "category": "한식",
    "location": {
      "name": "맛집 이름",
      "address": "경기도 주소",
      "lat": 37.xxx,
      "lng": 127.xxx
    },
    "phone": "031-xxx-xxxx",
    "menu": [
      {"name": "메뉴1", "price": 15000},
      {"name": "메뉴2", "price": 18000}
    ],
    "rating": 4.5,
    "reviewCount": 1234,
    "priceRange": "1만원-2만원",
    "images": ["https://images.unsplash.com/photo-xxxxx?w=800&q=80"],
    "openingHours": "10:00-21:00"
  }
]
\`\`\``;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const restaurants = JSON.parse(text);

    const dataDir = path.join(__dirname, '..', 'data');
    fs.writeFileSync(
      path.join(dataDir, 'restaurants.json'),
      JSON.stringify(restaurants, null, 2),
      'utf8'
    );

    console.log(`✅ ${restaurants.length}개 맛집 생성 완료!\n`);
    return restaurants;
  } catch (error) {
    console.error('❌ 맛집 생성 오류:', error.message);
    throw error;
  }
}

// 숙박 데이터 생성
async function generateAccommodations() {
  console.log('🏨 숙박 데이터 생성 중...\n');

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `경기도 ${currentMonthName} 추천 숙박 시설 10개를 JSON 형식으로 생성해주세요.

JSON만 출력하세요:
\`\`\`json
[
  {
    "id": "accommodation-1",
    "name": "숙박 시설명",
    "type": "호텔/펜션/리조트",
    "location": {
      "name": "숙박 시설명",
      "address": "경기도 주소",
      "lat": 37.xxx,
      "lng": 127.xxx
    },
    "phone": "031-xxx-xxxx",
    "priceRange": {
      "min": 80000,
      "max": 150000
    },
    "amenities": ["Wi-Fi", "주차", "조식"],
    "rating": 4.5,
    "reviewCount": 567,
    "images": ["https://images.unsplash.com/photo-xxxxx?w=800&q=80"],
    "bookingUrl": "https://booking.naver.com/example"
  }
]
\`\`\``;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const accommodations = JSON.parse(text);

    const dataDir = path.join(__dirname, '..', 'data');
    fs.writeFileSync(
      path.join(dataDir, 'accommodations.json'),
      JSON.stringify(accommodations, null, 2),
      'utf8'
    );

    console.log(`✅ ${accommodations.length}개 숙박 시설 생성 완료!\n`);
    return accommodations;
  } catch (error) {
    console.error('❌ 숙박 생성 오류:', error.message);
    throw error;
  }
}

// 메인 실행
async function main() {
  try {
    const courses = await generateMonthlyCourses();
    await generateRestaurants(courses);
    await generateAccommodations();

    console.log('\n🎉 모든 데이터 생성 완료!\n');
    console.log(`📅 ${currentYear}년 ${currentMonthName} 여행 가이드가 준비되었습니다.\n`);
  } catch (error) {
    console.error('실패:', error);
    process.exit(1);
  }
}

main();
