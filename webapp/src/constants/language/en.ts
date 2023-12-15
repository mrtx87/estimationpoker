import {ResponseMessageType} from "@/constants/vue-constants";

export const english = {
    key: 'en',
    texts: {
        'create.room.title': 'Create a room',
        'create.room.user.name.placeholder': 'user name',
        'create.room.room.title.placeholder' : 'type a room name',
        'create.room.option.realtime.voting' : 'Observers may see players voting in realtime?',
        'create.room.btn.title': 'create room',
        'create.room.btn.cancel': 'cancel',

        'app.content.btn.settings': 'settings',
        'app.content.btn.new.estimation': 'new estimation',
        'app.content.btn.reset': 'reset',
        'app.content.btn.reveal': 'reveal',
        'app.content.invite.link': 'invite link',

        'dsgvo.cookie.guidelines': 'Cookie guidelines',
        'dsgvo.privacy': 'Your privacy is important to us',
        'dsgvo.text1': 'In order to use EstimationPoker, you must agree to the use of first-party cookies.',
        'dsgvo.text2': 'We only use these cookies on this website for the following purposes:',
        'dsgvo.text3': 'Information about visited and created rooms',
        'dsgvo.text4': 'Saving the selected language',
        'dsgvo.text5': 'By confirming, you allow the use of these cookies and thus also the storage in the local memory of your browser.',
        'dsgvo.text6': 'All stored data will be deleted upon revocation. As a result, access to saved rooms is lost.',
        'dsgvo.confirm.btn': 'Accept',
        'dsgvo.decline.btn': 'Reject',

        'room.settings.title': 'Room settings',
        'room.settings.real.time.voting': 'Do you want observers to see other players voting in real time?',
        'room.settings.save': 'save',
        'room.settings.cancel': 'cancel',
        'room.settings.active.after.next.estimation': 'This change will become active with the next estimation',

        'avatar.configurator.hair': 'Hair',
        'avatar.configurator.face': 'Head',
        'avatar.configurator.shirt': 'Shirt',

        'estimation.history.completed.estimations': 'Completed Estimations',
        'estimation.history.name': 'Name',
        'estimation.history.deviation': 'Deviation',
        'estimation.history.votes': 'Votes',
        'estimation.history.time': 'Time',
        'estimation.history.createdAt': 'created at',
        'estimation.history.avg.title': 'average',

        'validation.text.user.name': '25 characters max',
        'validation.text.room.title': '40 characters max',

        'voting.information.estimation.underway': 'Estimation round in progress:',
        'voting.information.voters.count': '{} out of {} active participants have voted',
        'voting.information.evaluation.phase': 'Evaluation phase',
        'voting.information.average.estimated.value': 'Average estimated value is {}',
        'voting.information.name.for.estimation': 'Name for estimation',

        'evaluation.evaluation': 'Evaluation',
        'evaluation.submitted.votes': 'Submitted Votes - ',
        'evaluation.get.deviation.text': 'deviation: {} {}',
        'evaluation.get.deviation.text2': 'deviation: {}',
        'evaluation.deviation.none': 'none',
        'evaluation.deviation.small': 'small',
        'evaluation.deviation.medium': 'medium',
        'evaluation.deviation.large': 'large',
        'evaluation.deviation.extreme': 'extreme',

        'header.create.room': 'create room',
        'header.room.name.placeholder': 'Name of the room',


        'user.menu.roles': 'Roles',
        'user.menu.edit.user': 'edit user',
        'user.menu.delete.user': 'delete user',

        'room.history.create.room': 'create Room',
        'room.history.last.time.visited.room': 'Recently visited rooms',
        'room.history.title': 'Title',
        'room.history.participants': 'Participants',
        'room.history.estimations': 'Estimations',
        'room.history.your.user': 'Your User',
        'room.history.date.of.creation': 'Date of creation',
        'room.history.join.btn': 'join',
        'room.history.no.rooms.created.or.joined': 'You have not yet created or entered a room.',

        'footer.impressum.title': 'Imprint',
        'footer.datenschutz.title': 'Data Privacy',
        'footer.cookie.policy.title':'Cookie Policy',

        'impressum.owner': 'Owner',
        'impressum.address': 'Address',
        'impressum.email': 'E-Mail',
        'impressum.domain': 'Domain',

        'join.room.text':'join',
        'join.room.title':'Join Room',

        'main.button.cancel': 'cancel',

        'toast.warning.no.role.left': 'You may not remove all roles',
        'toast.remove.user.message': 'Do you really want to delete your User?',

        [ResponseMessageType.ANOTHER_USER_JOINED_SESSION]: '{} has entered the room',
        [ResponseMessageType.JOINED_ESTIMATION_SESSION]: 'You have entered the room',
        [ResponseMessageType.USER_DISCONNECTED]: '{} has left the room',
        [ResponseMessageType.USER_DELETED]: 'User {} has been deleted!',
        [ResponseMessageType.ACTION_UNKNOWN]: 'This Aktion is unknown!',
        [ResponseMessageType.ERROR_PROCESSING_USER_VOTE]: 'Error on processing vote',
        [ResponseMessageType.ERROR_CHANGING_ESTIMATION_TITLE]: 'Error when changing the title of the estimation round',
        [ResponseMessageType.ERROR_CHANGING_ROOM_SETTINGS]: 'Error when changing the room settings',
        [ResponseMessageType.ERROR_CHANGING_USER]: 'Error when changing the user',
        [ResponseMessageType.ERROR_CHANGING_ROLE]: 'Error when changing the user\'s role',
        [ResponseMessageType.ERROR_DELETING_USER]: 'Error when deleting the user',
        [ResponseMessageType.ERROR_DELETING_ROOM]: 'Error when deleting the room',
        [ResponseMessageType.ERROR_FINALIZING_JOIN]: 'Error when entering the room',
        [ResponseMessageType.ERROR_RESETTING_VOTES]: 'Error when resetting the votes',
        [ResponseMessageType.ERROR_REVEALING_VOTES]: 'Error when revealing the votes',
        [ResponseMessageType.ERROR_GENERATING_NEXT_ESTIMATION]: 'Error when generating the next estimation round',

    }
}