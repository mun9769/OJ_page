from selenium import webdriver
driver = webdriver.Chrome('C://Users//New//Desktop//OJ_page//python_file//chromedriver.exe')
url = 'https://sugang.inha.ac.kr/sugang/SU_51001/Lec_Time_Search.htm'

driver.get(url)

pop_up = driver.find_elements_by_tag_name('iframe')[0]
driver.switch_to.frame(pop_up)

while True:
    print()



# import requests

# req = requests.get('https://sugang.inha.ac.kr/sugang/SU_51001/Lec_Time_Search.htm')
# print(req.text)