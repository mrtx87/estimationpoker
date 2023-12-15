import {ResponseMessageType} from "@/constants/vue-constants";

export const german = {
    key: 'de',
    texts: {
        'create.room.title': 'Erstelle einen Raum',
        'create.room.user.name.placeholder': 'Dein Benutzername',
        'create.room.room.title.placeholder': 'Name des Raums eingeben',
        'create.room.option.realtime.voting': 'Beobachter dürfen die Spieler Schätzung in Echtzeit sehen?',
        'create.room.btn.title': 'Raum erstellen',
        'create.room.btn.cancel': 'Abbrechen',

        'app.content.btn.settings': 'Einstellungen',
        'app.content.btn.new.estimation': 'Neue Schätzung',
        'app.content.btn.reset': 'Zurücksetzen',
        'app.content.btn.reveal': 'Aufdecken',
        'app.content.invite.link': 'Einladungslink',

        'dsgvo.cookie.guidelines': 'Cookie Richtlinien',
        'dsgvo.privacy': 'Ihre Privatsphäre ist uns wichtig',
        'dsgvo.text1': 'Damit Sie EstimationPoker nutzen können, müssen Sie der Verwendung von First-Party-Cookies zustimmen.',
        'dsgvo.text2': 'Wir verwenden diese Cookies nur auf dieser Website für folgende Zwecke:',
        'dsgvo.text3': 'Informationen über besuchte und erstelle Räume',
        'dsgvo.text4': 'Speicherung des ausgewählten Sprache',
        'dsgvo.text5': 'Durch die Bestätigung erlauben Sie die Verwendung dieser Cookies und damit auch die Speicherung im lokalen Speicher ihres Browsers.',
        'dsgvo.text6': 'Bei Widerruf werden alle gespeicherten Daten gelöscht. Dadurch geht der Zugang zu gespeicherten Räumen verloren.',
        'dsgvo.confirm.btn': 'Annehmen',
        'dsgvo.decline.btn': 'Ablehnen',

        'room.settings.title': 'Raum Einstellungen',
        'room.settings.real.time.voting': 'Möchten Sie, dass die Observer die Abstimmung anderer in Echtzeit sehen können?',
        'room.settings.save': 'speichern',
        'room.settings.cancel': 'abbrechen',
        'room.settings.active.after.next.estimation': 'Diese Änderung wird erst mit der nächsten Schätzung aktiv',

        'avatar.configurator.hair': 'Haare',
        'avatar.configurator.face': 'Kopf',
        'avatar.configurator.shirt': 'Shirt',

        'estimation.history.completed.estimations': 'Abgeschlossene Schätzungen',
        'estimation.history.name': 'Name',
        'estimation.history.deviation': 'Abweichung',
        'estimation.history.votes': 'Stimmen',
        'estimation.history.time': 'Zeit',
        'estimation.history.createdAt': 'Erstellt am',
        'estimation.history.avg.title': 'Durchschnitt',

        'validation.text.user.name': 'maximal 25 Zeichen',
        'validation.text.room.title': 'maximal 40 Zeichen',

        'voting.information.estimation.underway': 'Schätzrunde läuft:',
        'voting.information.voters.count': 'Es haben {} von {} aktiven Teilnehmern abgestimmt',
        'voting.information.evaluation.phase': 'Auswertungsphase',
        'voting.information.average.estimated.value': 'Durchschnittlicher Schätzwert ist  {}',
        'voting.information.name.for.estimation': 'Name der Schätzung',

        'evaluation.evaluation': 'Auswertung',
        'evaluation.submitted.votes': 'Abgegebene Votes - ',
        'evaluation.get.deviation.text': 'Abweichung: {} {}',
        'evaluation.get.deviation.text2': 'Abweichung: {}',
        'evaluation.deviation.none': 'keine',
        'evaluation.deviation.small': 'klein',
        'evaluation.deviation.medium': 'mittel',
        'evaluation.deviation.large': 'groß',
        'evaluation.deviation.extreme': 'extrem',

        'header.create.room': 'Raum erstellen',
        'header.room.name.placeholder': 'Name des Raums',

        'user.menu.roles': 'Rollen',
        'user.menu.edit.user': 'Benutzer bearbeiten',
        'user.menu.delete.user': 'Benutzer löschen',

        'room.history.create.room': 'Raum erstellen',
        'room.history.last.time.visited.room': 'Zuletzt besuchte Räume',
        'room.history.title': 'Titel',
        'room.history.participants': 'Teilnehmer',
        'room.history.estimations': 'Schätzungen',
        'room.history.your.user': 'Dein User',
        'room.history.date.of.creation': 'Datum der Erstellung',
        'room.history.join.btn': 'beitreten',
        'room.history.no.rooms.created.or.joined': 'Du hast bisher noch keine Räume erstellt oder betreten.',

        'footer.impressum.title': 'Impressum',
        'footer.datenschutz.title': 'Datenschutz',
        'footer.cookie.policy.title': 'Cookie Richtlinien',

        'impressum.owner': 'Eigentümer',
        'impressum.address': 'Adresse',
        'impressum.email': 'E-Mail',
        'impressum.domain': 'Domain',

        'join.room.text': 'beitreten',
        'join.room.title': 'Raum beitreten',

        'main.button.cancel': 'abbrechen',

        'toast.warning.no.role.left': 'Du kannst nicht alle Rollen entfernen',
        'toast.remove.user.message': 'Willst du deinen Benutzer wirklich löschen?',

        [ResponseMessageType.ANOTHER_USER_JOINED_SESSION]: '{} hat den Raum betreten',
        [ResponseMessageType.JOINED_ESTIMATION_SESSION]: 'Du hast den Raum betreten',
        [ResponseMessageType.USER_DISCONNECTED]: '{} hat den Raum verlassen',
        [ResponseMessageType.USER_DELETED]: 'User {} wurde gelöscht!',
        [ResponseMessageType.ACTION_UNKNOWN]: 'Diese Aktion ist leider nicht bekannt!',
        [ResponseMessageType.ERROR_PROCESSING_USER_VOTE]: 'Fehler beim Verarbeiten des Votes',
        [ResponseMessageType.ERROR_CHANGING_ESTIMATION_TITLE]: 'Fehler beim Ändern des Titels der Schätzrunde',
        [ResponseMessageType.ERROR_CHANGING_ROOM_SETTINGS]: 'Fehler beim Ändern der Raumeinstellungen',
        [ResponseMessageType.ERROR_CHANGING_USER]: 'Fehler beim Ändern des Benutzers',
        [ResponseMessageType.ERROR_CHANGING_ROLE]: 'Fehler beim Ändern der Rolle des Benutzers',
        [ResponseMessageType.ERROR_DELETING_USER]: 'Fehler beim Löschen des Benutzers',
        [ResponseMessageType.ERROR_DELETING_ROOM]: 'Fehler beim Löschen des Raums',
        [ResponseMessageType.ERROR_FINALIZING_JOIN]: 'Fehler beim Betreten des Raums',
        [ResponseMessageType.ERROR_RESETTING_VOTES]: 'Fehler beim Zurücksetzen der Votes',
        [ResponseMessageType.ERROR_REVEALING_VOTES]: 'Fehler beim Aufdecken der Votes',
        [ResponseMessageType.ERROR_GENERATING_NEXT_ESTIMATION]: 'Fehler beim Erzeugen der nächsten Schätzrunde',
    }
}