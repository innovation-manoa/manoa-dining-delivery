from selenium import webdriver
from bs4 import BeautifulSoup
import json
import time
import sys


def get_meal_tables(soup):
    meal_tables = []
    for table in soup.select('table[class^=mnProdGrpList]'):
        meal_tables.append(table)
    return meal_tables


def get_meal_categories(soup):
    mapped_meals = []
    for meal in soup.find_all('h2'):
        mapped_meals.append(meal.text)
    return mapped_meals


def test_scrape(soup, tables, categories):
    menu_items = {}
    types = {}
    all_items = []
    count = 0
    found_category = False

    for i, table in enumerate(tables):
        for product in table.findAll("tr"):
            if product.has_attr("class"):
                if product['class'][0] == "category":
                    current_category = product.text
                    all_items = []
                    types[current_category] = all_items
                else:
                    item = {
                        "name": product.select_one('td[class="mnCat mnName"]').text,
                        "calories":  product.select_one('td[class="mnCat mnCal"]').text}
                    types[current_category].append(item)
        all_types = {"type": types}
        menu_items[categories[i]] = all_types
        types = {}
    return menu_items


def main():
    hale_aloha = "https://uhm.sodexomyway.com/smgmenu/display/univ%20of%20hawaii-hale%20aloha%20-%20resident%20dining"
    gateway = "https://uhm.sodexomyway.com/smgmenu/display/univ%20of%20hawaii-gateway%20late%20-%20resident%20dining"

    browser = webdriver.Chrome()
    selection = sys.argv[1]

    if selection == 'gateway':
        browser.get(gateway)
    elif selection == 'hale':
        browser.get(hale_aloha)
    else:
        print("Usage: python scrape_menu.py <hale or gateway>")
        sys.exit(0)

    days = ['Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday']

    whole_menu = {}
    for i, tabs in enumerate(browser.find_elements_by_css_selector('div[class=tabs] li')):
        browser.find_elements_by_css_selector('div[class=tabs] li')[i].click()
        html = browser.page_source
        soup = BeautifulSoup(html, 'lxml')

        categories = get_meal_categories(soup)
        tables = get_meal_tables(soup)
        menu_items = test_scrape(soup, tables, categories)
        whole_menu[days[i]] = menu_items

    outfile = open(selection + '_weekly_menu.json', 'w')

    json.dump(whole_menu, outfile, sort_keys=True,
              indent=4, separators=(',', ': '))
    print("Data scraped into " + selection + "_weekly_menu.json")

    exit = input("Type something to exit: ")
    browser.close()

if __name__ == '__main__':
    main()
