$('.boxA').click(function(e) {
    e.preventDefault()

    let target = $(this).attr('data-target')

    $('.content').each(function() {
        $(this).css(
            'display',
            ($(this).attr('id') === target) ? 'block' : 'none'
        )
    })
})

let key = 'f8a2dea0b048486bb301d78cecd1702a'
let city = '辛集'

        async function getLocId() {
            let locationId = await fetch(
`https://geoapi.qweather.com/v2/city/lookup?location=${city}&key=${key}`
            )
            .then(res => res.json())
            .then(data => {
                return data.location[0].id
            })
            return locationId 
        }

        async function getWea() {
            let id = await getLocId()
            fetch(
`https://devapi.qweather.com/v7/weather/now?location=${id}&key=${key}`
            )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let icon_code = data.now.icon
                $('#icon').attr('src', `../wea_icons/icons/${icon_code}.svg`) 
                $('.fu_icon').attr('src', `../wea_icons/icons/${icon_code}.svg`) 
                $('.temp').html(data.now.temp + '℃') 
                $('.temp_feels').html('体感温度：' + data.now.feelsLike + '℃') 
                $('.tempTextDiv').html('天气：' + data.now.text) 
                $('.windDir').html('风向：' + data.now.windDir) 
                $('.windSpeed').html('风速：' + data.now.windScale + '级') 
                $('.humidity').html('湿度：' + data.now.humidity + '%') 
                $('.precip').html('降水量：' + data.now.precip + 'mm') 
                $('.cloud').html('云量：' + data.now.cloud + '%') 
                $('.dew').html('露点温度：' + data.now.dew + '℃') 
            })
        }
        getWea()

        async function getFutureWea () {
            let id = await getLocId()
            fetch(
`https://devapi.qweather.com/v7/weather/3d?location=${id}&key=${key}`
            )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                fu_iconCode = data.daily[0].iconDay
                fu1_iconCode = data.daily[1].iconDay
                fu2_iconCode = data.daily[2].iconDay
                document.getElementsByClassName('fu_icon')[1].src = `../wea_icons/icons/${fu_iconCode}.svg`
                document.getElementsByClassName('fu_icon')[2].src = `../wea_icons/icons/${fu1_iconCode}.svg`
                document.getElementsByClassName('fu_icon')[3].src = `../wea_icons/icons/${fu2_iconCode}.svg`
                document.getElementsByClassName('fu_icon')[4].src = `../wea_icons/icons/${fu_iconCode}.svg`
                document.getElementsByClassName('fu_icon')[6].src = `../wea_icons/icons/${fu1_iconCode}.svg`
                document.getElementsByClassName('fu_icon')[8].src = `../wea_icons/icons/${fu2_iconCode}.svg`

                fu_moonCode = data.daily[0].moonPhaseIcon
                fu1_moonCode = data.daily[1].moonPhaseIcon
                fu2_moonCode = data.daily[2].moonPhaseIcon
                document.getElementsByClassName('fu_icon')[5].src = `../wea_icons/icons/${fu_moonCode}.svg`
                document.getElementsByClassName('fu_icon')[7].src = `../wea_icons/icons/${fu1_moonCode}.svg`
                document.getElementsByClassName('fu_icon')[9].src = `../wea_icons/icons/${fu2_moonCode}.svg`
                
                $('.fu_temp').each(function(index) {
                    $(this).html(`${data.daily[index].tempMin}℃ ~ ${data.daily[index].tempMax}℃`) 
                })
                $('.fu_tempText').each(function(index) {
                    $(this).html(`天气：${data.daily[index].textDay}`) 
                })
                $('.fu_windir').each(function(index) {
                    $(this).html(`风向：${data.daily[index].windDirDay}`) 
                })
                $('.fu_windScale').each(function(index) {
                    $(this).html(`风速：${data.daily[index].windScaleDay} 级`) 
                })
                $('.fu_precip').each(function(index) {
                    $(this).html(`降水：${data.daily[index].precip} mm`) 
                })
                $('.fu_uvIndex').each(function(index) {
                    $(this).html(`紫外线强度：${data.daily[index].uvIndex ? data.daily[index].uvIndex : 0}`) 
                })
                $('.fu_hum').each(function(index) {
                    $(this).html(`相对湿度：${data.daily[index].humidity} %`) 
                })
                $('.fu_pressure').each(function(index) {
                    $(this).html(`大气压强：${data.daily[index].pressure} hPa`) 
                })
                $('.fu_vis').each(function(index) {
                    $(this).html(`能见度：${data.daily[index].vis} km`) 
                })
                $('.fu_cloud').each(function(index) {
                    $(this).html(`云量：${data.daily[index].cloud} %`) 
                })
                $('.fu_sunTime').each(function(index) {
                    $(this).html(`日间：${data.daily[index].sunrise} ~ ${data.daily[index].sunset}`) 
                })
                $('.fu_moonPhase').each(function(index) {
                    $(this).html(`月相：${data.daily[index].moonPhase}`) 
                })
            })
        }
        getFutureWea()

