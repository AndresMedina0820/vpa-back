'use strict';

const { USER_TABLE } = require('../models/userModel');
const { ROLE_TABLE } = require('../models/roleModel');

module.exports = {
	async up (queryInterface) {
		await queryInterface.bulkInsert(ROLE_TABLE, [{
			id: 0,
			name: 'Asesor'
		}, {
			id: 1,
			name: 'Programador'
		}, {
			id: 2,
			name: 'Administrador'
		}]);

		await queryInterface.bulkInsert(USER_TABLE, [{
			"user_id": 600483,
			"type_id": 1,
			"name": "Melodee",
			"last_name": "Ellif",
			"email": "mellif0@yellowbook.com",
			"password": "UJsNlp4E9vIk",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKGSURBVDjLpZNPSFRhFMV/33vfzDjOvBmlRkuz0THKIjGN2qSrFkFEBUFBG1fhtkW7aB1UUNDCyIJaRC3aRAXWxkroHxpCRGaY2uS/GWfUGUfffPPe+1poUbvCs77n3HPvuVdorVkP5P8Ujz3ae0IVtj80w80U5l4i7MlO8a8OfvQmTsvAyXvBjR1EG1pZGHvD8PNbs/JCz7u+snKrdS5fCi3ZjuFp8NC4nsbTGldrmq234kx7p4hWtJEd/YxfKKzIJsoq4zEZq4zWdR3bHimWtCgLmH91FYDKvEKlM0QThyhOP8BfLpgYGsb1/Fwe25c0UjknoRxP3OubJjmnKBQ1ExmPZNYjOdaHSvUSbTyMPdWD8M3jC1tgz2Hu7WK5YvdWo1B0RcBnULs5wvPBFAtLJaojgpXxx5QvPCO67Sj2ZDeGr4TK1TP1YoiB6vPE6psAhFy2HQASm8IIDb0DKdo3DOLLvaaq/Qhq5hamX2Mvxpnp/8DgtmtsrGtE6FWeUbDd1TxNSNSEiWaeYWbfo9wapj9ex8OmkK0l2f+JgcQVahsaCf4RviysrCoJAU7JwTd9n13Hb/PlwTlG+l8T2NqCPZ9mvu0ivnAMQztIn/y9ZWO56KIBpRxms3lGvqVRn57Q0NJBKLSDyaFR9IFLNDXvoX6zRXYhj+c4aA1ogVwuOtr1tEhl8tTFLO58TXH1Zjf7dzbgj7fQfOou/sgWPDSy3I+ssphK51ipCIL2tCxkJ8eLyok3bQmKcNAQN54mMdZGEkKsOfUQvw4DSbzS8sZn8iqX/jEl1VJ64uDZ3sqAFQrJgCmkNDFMgWmAYQgMucpb00KAdh2lVhbnM+nR5Hex3m80WCd+AqUYHPPwkaN5AAAAAElFTkSuQmCC",
			"role": 0,
			"created_at": "02/03/2022"
		}, {
			"user_id": 887140,
			"type_id": 0,
			"name": "Hanan",
			"last_name": "Tebbutt",
			"email": "htebbutt1@alibaba.com",
			"password": "cYxn8Ty",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG/SURBVDjLjZK9T8JQFMVZTUyc3IyJg4mDi87+GyYu6qB/gcZdFxkkJM66qJMGSNRBxDzigJMRQ1jQ4EcQ+SgVKB+FtuL13EdJxNDq8Ev7Xu85797T51nwhqeAH5w6cAxWwDgReX7jwYfdaCIraroptB7NLlVQrOoiGEsL1G06GZyxuILicsMUH3VTlOqGKNUMUdTacj+j1Nng0NGAT2WxYosK1bbIVVoiW27J9V8G57WWKVSczMV5iK+Tudv1vVh5yXdlLQN+os4AFZss2Ob82CCgQmhYHSnmkzf2b6rIhTAaaT2aXZALIRdCLgRtkA1WfYG4iKcVYX52JIs7EYvFmJ8wGiEXQi6EXAhdyn2MxQaPcg68zIETTvzyLsPzWnwqixVbhFwI3RFykes+A9vkIBKX4jCoIxdCLrI4/0OcUXXK4/1dbbDBS088xGGCCzAJCsiF2lanT8xdKNhHXvRarLFBqmcwCrbAhL32+kP3lHguETKRsNlbqUFPeY2OoikW62DNM+jf2ibzQNN0g5ALC75AGiT59oIReQ+cDGyTB+TC4jaYGXiRXMTD3AFogVmnOjeDMRAC025duo7wH74BwZ8JlHrTPLcAAAAASUVORK5CYII=",
			"role": 1,
			"created_at": "02/03/2022"
		}, {
			"user_id": 49235,
			"type_id": 2,
			"name": "Filberte",
			"last_name": "Matkovic",
			"email": "fmatkovic2@hp.com",
			"password": "EkfYJjOrYT8",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKRSURBVDjLjZNLSFRhGIYn1IULF+2CiJA2tWob1CIKa+WqoghaRBERrYKS2kSLCoKIQmbQKAwLSs3FRDbeM03TmmnGG3kZc3ScizPjzJnRuTlznr7/eGFMgg485xzO977v//2XYwJMhZx7aDssVAsOISREhQnBomp/6wuNZYJZyLbaPYzOafwOZ1hIrOKNLNPumEPV1jVlWwLWzbY33RPk8jpeDZqH4rwfjvMtkiElorygakqjtBshGwFmVYhlMa6EqOt7YtT1L+GK5dHlmzzQ8mv19RCzESAvh4S8J5KlfiDMZHhN1GJPYekMM72M0UFAbgl5ZhS6rgLyymuM3ibzaxnWeN4ToqY7xIgXpgIwMJmQ6aSJpCEoAZq0Es1BXGhbWxOzCnC6PDFe9S1KQBDL5yBWh0ZD77QS+BVNfW4SYlqQbiaXwLWQw+XRVN2pAsJj3hUZOUiNmGslZNCdUEWfsHsd30QgjVUWtfFHzGDEm1Sa8GaApSuIuSNAdYefoZntASPzSRrtGq8Ho0KE4YIAp3M2irnLb5jfSfpkWEe1vTGFhl43fS+f0nXhAB3HS2g9s5evlnubUzAWsX8mhSsIc0lwx4UYTCymGfWl6a+rxnnzCKmPj9HHbay8vcH36wd5cvFU7+Y2ZmVrgrJHv6Jg98MXD7RP5/gwluHT2X0kxcyzSqjaCQ/KCT06SsuJ0oUtBykk2+UKQa+Y26Z0rOOrNLlSRtu6vZnCK3p3Fx3HivVtR9kb1/kpHbRP5bCOZGhyJrGd3sPyi0sgpvQtE0uC52oRrRVF3n/+TI5ZjXF/xliDgdr7DF7Zj6+qnMXbJbgv76Czsjhnqyi6Y/qP31nhqL12vr/lZKlPtS0jzyuz0v8BvOcGre/IsB0AAAAASUVORK5CYII=",
			"role": 2,
			"created_at": "05/04/2022"
		}, {
			"user_id": 287101,
			"type_id": 1,
			"name": "Angus",
			"last_name": "Lardier",
			"email": "alardier3@imgur.com",
			"password": "hoqSqGHKh",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEoSURBVDjLrZMxSgRBEEXfiBiIkRjpRTyAuZGH8ALewmtsbOAVNjM1F0FEwURwZ9vq+t+gZ3aR3RFEC5qGLv6v11XdnW3+ErsAs9nMpRT6vme5XLJYLDZW3/erfCmF+XzeAXT/QgBwc7ewASUYsOHidL+7vn1eVzCkzNX5cbdhkIKjgx0EWPDyrpXu5HAP2Ujw+LrcTmBDuu0y1LV+JVaaSG83qAnS2iBzPDdZQTKZIsqEgQYC6TtBraKmUJoqUaL+TNAMjLI5RIhaW/VMTxNUtUbKbgTDFT7DK4pMU8bExhRSpLp1DzwaJFFFDhQRUwSGp7ckh4mM7ytKUqNVrzIREwSXZwfdtpdWwsRQXWpT2WowFRHZxNl6I+l3BvXT3D98bAjH+PNn+gIL+yQjrYYUIQAAAABJRU5ErkJggg==",
			"role": 1,
			"created_at": "04/07/2021"
		}, {
			"user_id": 60604,
			"type_id": 2,
			"name": "Enoch",
			"last_name": "Baggarley",
			"email": "ebaggarley4@engadget.com",
			"password": "foeVLuXsNeH",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJtSURBVDjLjZPLa1NREIe/m1dr1aY22tb4qEkEX4hYaKG+7UIFS5auBOlG6bbgHyC4EHEhKCjiVhBcaVWsBSVgikLF2iqxPqI1llrTxiba9N6Tc+64CAaDFRw4DDNwvt/MOTOICP9zpjo7ZbG8h/+0/p6eRfOWiFSCVColxhi01vz2Wmuy2SzJZJJwOEwsFiMej1u/7/j+pJVKJaLRKAB/gkWErq4uRISBgYGqCqoAWmsAHo+XOzMCxgVXXIyBI1s1juP8G6CUQkRoa/m+6EOq7Cgd3vu8v5OR+ZkElj15YlHA0y8rcMVFu+UKtIFmfY+dnhe0bD9OMLKTuY+bePPw+vm/AADtq2eqlK1CgqB/gqX1u8l9SBGwFMvrW1gWWh+sAjiOg4iQ+NSIEUG7ENJD7A+nCUYO40zdJFBnMTHyhpKtZu2Fn7uqAHkzh4iwZ122rF54RqNvjGAsjj15FU9A41/WSm1xbLr403ekvW/wbWWQTj/t3fC6YRgRwXVd7t84w1L9kuDGOPbkFTz+EqqwgczjZ6gfxe62vsGRql9wXTfi8XtJ5ceo+/yOg+2raNp2FPX1Ot6AYOdb+fbkOdeCIT54fev7YRgoj3Jf8lQ9xnoU8q9kKHGZgJ3GsI6psUu42Mzn1jA99IoLfi8NzTG0MhcOXezaXgEYbXodpeRddpzW6Rxb95ykJvOEt7eTjAzkeNGf5IG7mYJaQq4wg9Y6bLR7ttKCuVV7DsACxtU06vVdIjv2ks/Okh5OMVp3gMLXIo1WE7OZ76xVrTU1qjb+1zIBHNvXuNAWbfZ1bIkgfmdo4Vu2p/vcaPpfW/oLvSN/oHdKKLQAAAAASUVORK5CYII=",
			"role": 0,
			"created_at": "11/06/2021"
		}, {
			"user_id": 960867,
			"type_id": 0,
			"name": "Thaddus",
			"last_name": "Spellesy",
			"email": "tspellesy5@google.com.hk",
			"password": "PJi0cK18Rb",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKFSURBVDjLhVNNaxNRFD3vzUwSJ622YEwgYoVaNBUVilZwqStBtJBNxC4EEel/sDsXLhRcVxSUQo07QVy0jbpQqiANsS5ciNpowBhM2kk7nWS+vPdJqi0tXjhz39x595zz7syIMAxRKBSilM8TLgZBcIjyAIGWwQfKnyjfIxRGRkZ8bAoxOzs7SJumEonE0VQqhXg8DtM0wcTLy8toNpsol8uo1WqvqJbLZrOVDQzT09MvFhcXWS7cLlzXDYvFYpjP5x8w8b+QdDmcTCbxv0in0yCRs5vrOhUVU7VaRSwWQzQahWEYqmbbNur1OiqVCvr7+5kA2xLouo5GowHHcdS953mwLAutVks949qWBJ2zaJqmHPBmxs0ndXRHe2G3PfR2RfBo/geEHEy8v1sKg1CgYa3hebFyct0BK9KwVBZCYM12cHr4IC4MdeHpm+8Yv5TZoPzwZY0cibeyQ+D7vmpm8Npuuag3PbV55l11vdGhktUCakttEgr+zoDVGdzMx5FSQAsB1w9we2yI1OioRKDR1dShZmOttv8QMDrqHcKYIeGQixv5ryAueEQUEJiEn/PCNAJIVuRXRV+ieoWd8Eix5XvQpEFWdZAfyho1SiIQcEmsTQNmB5fn5uYeZzKZeF9fnyLhITbtKgxqHDvXTWRtopRKNaRzx/QIbk2V8ctahZ7L5Z5NTk4eWVhYuF4qlbJSyl38L/hBijQNBFjD/flr2G3uIxcSNfsbrp64Q6sYDZpmwHZHR0e/ULrCmJiY6F5ZWTmg6+n5/Skg2dXEmWPD6ImklYklJ409cQ9mhD4icirUQLaI42Mzrwf27jjVE+0hyzvpGC4EDViEPgJh42P5M35aLn4DnlayCCcx84IAAAAASUVORK5CYII=",
			"role": 0,
			"created_at": "04/01/2022"
		}, {
			"user_id": 971953,
			"type_id": 1,
			"name": "Lanita",
			"last_name": "Delbergue",
			"email": "ldelbergue6@bing.com",
			"password": "r338PMw",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVDjLpZPNS1RhFMZ/5733zkzjR/ZBCUpoJdUiBCkll4m0CUKJIGpVSLjyL2gntDFop6shAolWbcSNIW0ircHBUHCloo3VjNY0jjP3831bWA5ai8Bnfc7vPOfhHDHGcBjZAENji7N1cSj7IcdqY2zkKoiC2qSFNsKPYoXpTPbBynj/4j8BlbLL9c4L3OqoZWLmM4/vXdpX9OJtHq0lBXQdBIgxhvtPZmZ7ui+yspZrjwKfWExxtMbh66YLAgj4geZnyd2YzmT7Vsb75/c5UEqwDLgVl55r57hxuYY3c18Y6mtDgO1KSBBETMwV0VpeA2f3ARKOwvUCcgWX9bzH0NhqvC4Okx9zBzNpPdGQ4OHIrJnOZLtWxvs/2AChNnhRiFIKy8j/ZjILiALYLgc4YnO8zsJSIWUv4Pt2CMBU+tteoxtC0YN8wUdEV1eItMHCIdSagru5l0kQaZ4OdqC1wQAWhqQNnudR3PGrANu2aGmE9FJATSxJwinhegHDr1ZRAmGk0ZHGAMYYMJB0dh0ogOVs6VNqcoGtosYv1+9lYikHERvBQsQCozBGCMIQ3w+rDtKjvQMAd4bfL59vFqYzQasjNoM36wi1vzvHgBFNwo4x8nKNreJOFfBHy9nSXGpyoSPSYOGgqZCae8TJ5BkERb68zsDVZygSlD3/b0B6tPf2byempRFO127T095JQ6wJFBTcJk7VhCRjYItUT/mgrgxOvWtrPtLdEG8gYdcT6gDRGjERWsosrS2TKwbMP78rcth3/gX/0SEvLZFG1QAAAABJRU5ErkJggg==",
			"role": 2,
			"created_at": "06/02/2022"
		}, {
			"user_id": 321585,
			"type_id": 0,
			"name": "Ekaterina",
			"last_name": "Mullard",
			"email": "emullard7@bloglines.com",
			"password": "9DLRty61Al9q",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHYSURBVDjLxZPNS5RhFMV/7yhGhsL0oaSBfRDF5CIFKchVRCHVNugPiEDa9AcUBEEgQosWUVC0ixYuQtoUmAuLWlSbehmpFGGQQEhCafK5Xy3mdYIKWrjobs498NzDec7lZhHBRqrEBqu1+uByzcx63Q0zxUxQFVRTE0USqunpmevTp/4QMLPermMjRBhhTrjiboQpYYKbEqa8nbx/8q8OVAV3Ze3bImGKq+AmDdSEa2JT507udIxx+9rzMDVMzVR0dGb89N1W1UR35ew//2rTU1w9P4h5UFtabbk18eYG0BC48mSO6uIKlhxNhiVD16zJD/ZsQUVJGhzqKzOwp8zNh6+2ArSKrHFxxwzfSwuFZcEK6+u8fVsfF2pDdG7OWPiyzIFdZSQJTQGXhKV6MSjNQdfUCFIFSYKok9dWqSf7JZDSD0wTbR3djcS1SN612IARKmgSRIO9Xe2IBSoKQHbuxOGIcNydCCcK9IgGj4AI5koDRATh0cAIZl8/zkqPnr3L3i/KfHnfUXr6j1Ndyup9gyN07j7Cp69tU5MvPmeTL+eyDzMTGcvV+eH+7Qzt76Bl5eMUQBYRVCqVYWAMqAP3gEtFP5rn+ez6Kn97N5rn+Wz2349pwwI/AbeHbP+UHpVDAAAAAElFTkSuQmCC",
			"role": 1,
			"created_at": "02/03/2022"
		}, {
			"user_id": 159018,
			"type_id": 2,
			"name": "Atlanta",
			"last_name": "Van der Krui",
			"email": "avanderkrui8@imageshack.us",
			"password": "uDMrBGYnQoIO",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKKSURBVDjLpZNdSBRRGIbnzOzubSxBRReBYhTRDziQQlKxbmoKItp0YVRUsBB2UVQsWdkfilHaj6GuZqEkhJaSf6knISqUYIgooogWS2uRwjFd25yZ3Xn7NlKS3bzp4jDMzHne73zPfCMAEP5nzbux6gU5UifwsE+AWSMos89DVczz4xpD8ArjkxUsMW4AwZ7InSWwetJh8Vzo1YzPviNYjfTmQL8rY+KSqI1fFJWYAKrsjjSvgPV4F/DsAGbqFyF0nSVOX2Xu0M3lwKMdCHdlgGDtW5kox23BqGFes2UdBeyD2ZYKgn1Tlcynt6YAPB/TDUkg2PNPB9H1s4pxozWZTlIIgjX9XipVL0CoaW0U9sVINGsF2ahm8l/9OkmWZg3shNWXC/TnwnzgwtdSUR27IDpn942cluSPxZIsRGXpt5eCTINg7Y9pNdy1DejbDjzMhNm+BQSrgXMS/1wi+UdOSQiUOeH32rgwc4PxSH8eMFSECC+A2Z0Ns5PAgXygNxPoTqdrFoz2dMy0bKLTuCk0B6HmjXh3hALINCdZCFYyTFaIKn0mTqa50baZNmZQgAvG/TSMlkjqp5MSHz4h+T8ct+HtYRteFdl5jMTxctFJsjSrLw/hDtfvEL01DQSrBDsXnMToIphPN66H0ZGJL2ckf7ApGejJglazCu+P2XwLBpDp8smG1dS/gonalSDTHjLtm7q1AehyIXA5AS8P2r1xAwhWvtcm0Bjn08Rlg0xrBDvJtHukdBnQuRU6SXxzdDGG9jpiJ3HsvKgEzkpasDEZE3VrMFwszVV6fciuTjWmYLQ8CYN7HNrTQocStwUynUiyWkgWJ9Nzf90Lj115vt/BB3c7vE8KHfNE/gKM7aCNx0eNYwAAAABJRU5ErkJggg==",
			"role": 0,
			"created_at": "02/03/2022"
		}, {
			"user_id": 649979,
			"type_id": 2,
			"name": "Gnni",
			"last_name": "Brosius",
			"email": "gbrosius9@slashdot.org",
			"password": "Ow9TlQ",
			"picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIDSURBVDjLpZJPSJRRFMXPN46GWqRjZjkOhILU2lXUotzYqglmEQURZLtQbFEK2VLIlQVu2kXQIsOghDaFZS1yI4Vhf3CcwWSgNlmRY3z3nPu10GxEF2UXHo97ee/AuecXRFGE/6nYvzw+M5LpO3XnRNmWBRjqNI03S2dBqYXuZ50pp2ckdYhqE1VPCjKBFBprknAKc4XcjbELj3vWCXQ/7TwoqTdZ1ZSurUygurwa8VgcigS5w11gJJiIN9lpZD/ODTy59KI/DgBd4+dSLu/dnziQbqjeg2UWEQvKQBe0ejzSWm9G0FgBAHEAEJVJbm9K11ftBp0ISWQ/v0P+Ux5rFoxo3JWEJMzN54Ynrry8XCrQsXNbDYq2BMkx/nZ8QdToyNmxi6ULax88PC3j1ET/ZNe6FEi1VZZXIUAMhS8F0Ljh80oKvGvG86WzOADQCIoIggAmgiE3jfH51cmBTUFiqKnFH4tYtiISO+pgxsyx60eH/oaNIIoinLx9vKexNjnUsrcFihxLy0uYnZ9FfiEP2h8ORK30EmaGPwRrFsw4mivkjlSUVaTrEw0IEaK1uRXN+1rgkeDuoAsOh9zx8N7Yegv3Ox8tWMjBV+9fP5jJzuDb1+8o/iyu7EOCuaBI4CpQojZHuf3aoRRNGZIdMrWRqpMpJgqS4/ftcuRuzQcbBLZSvwCJx2jrjVn/uwAAAABJRU5ErkJggg==",
			"role": 2,
			"created_at": "02/03/2022"
		}]);
	},

	async down (queryInterface) {
		await queryInterface.bulkDelete(ROLE_TABLE, null, {});
		await queryInterface.bulkDelete(USER_TABLE, null, {});
	}
};
