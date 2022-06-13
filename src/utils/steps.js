import { lazy } from 'react'
import intl from 'react-intl-universal'

export const stepperSteps = [
  {
    label: intl.get('serializationTasks.serializationStep.firstStep.label'),
    icon: 'Barcode',
    page: lazy(() => import('../components/organisms/SerializationSGTINLGTINSteps/Select'))
  },
  {
    label: intl.get('serializationTasks.serializationStep.secondStep.label'),
    icon: 'Sort',
    page: lazy(() => import('../components/organisms/SerializationSGTINLGTINSteps/Serialization'))
  },
  {
    label: intl.get('serializationTasks.serializationStep.thirdStep.label'),
    icon: 'SignOut',
    page: lazy(() => import('../components/organisms/SerializationSGTINLGTINSteps/Assign'))
  },
  {
    label: intl.get('serializationTasks.serializationStep.fourthStep.label'),
    icon: 'Edit',
    page: lazy(() => import('../components/organisms/SerializationSGTINLGTINSteps/Update'))
  },
  {
    label: intl.get('serializationTasks.serializationStep.fifthStep.label'),
    icon: 'Configuration',
    page: lazy(() => import('../components/organisms/SerializationSGTINLGTINSteps/Export'))
  },
  {
    label: intl.get('serializationTasks.serializationSSCCOptions.lastStep.label'),
    icon: 'Check',
    page: lazy(() => import('../components/organisms/SerializationSGTINLGTINSteps/Confirm'))
  }
]

export const stepperSSCCSteps = [
  {
    label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.label'),
    icon: 'Configuration',
    page: lazy(() => import('../components/pages/SerializationSSCCOptions'))
  },
  {
    label: intl.get('serializationTasks.serializationSSCCOptions.lastStep.label'),
    icon: 'Check',
    page: lazy(() => import('../components/pages/SerializationSSCCConfirm'))
  }
]

export const stepperTodoCardsSteps = [
  {
    label: intl.get('todo.cards.steps.firstStep.label'),
    page: lazy(() => import('../components/organisms/TodoSettingsForm'))
  },
  {
    label: intl.get('todo.cards.steps.lastStep.label'),
    page: lazy(() => import('../components/organisms/TodoStepsSetting'))
  }
]

export const stepperCampaignRewardsSteps = [
  {
    label: intl.get('campaigns.rewards.form.stepText1'),
    page: lazy(() => import('../components/organisms/CampaignStepsSettings'))
  },
  {
    label: intl.get('campaigns.rewards.form.stepText2'),
    page: lazy(() => import('../components/organisms/CampaignsStepsTargetForm')),
    type: 'antd'
  },
  {
    label: intl.get('campaigns.rewards.form.stepText3'),
    page: lazy(() => import('../components/organisms/CampaignsStepsAssignProducts'))
  }
]

export const stepperCampaignBotSteps = [
  {
    label: intl.get('campaigns.bot.form.stepText1'),
    page: lazy(() => import('../components/organisms/CampaignsBotStepsSettings'))
  },
  {
    label: intl.get('campaigns.bot.form.stepText2'),
    page: lazy(() => import('../components/organisms/CampaignsBotStepsTargetings')),
    type: 'antd'
  },
  {
    label: intl.get('campaigns.bot.form.stepText3'),
    page: lazy(() => import('../components/organisms/CampaignsBotStepsPickUpContent'))
  },
  {
    label: intl.get('campaigns.bot.form.stepText4'),
    page: lazy(() => import('../components/organisms/CampaignsStepsAssignProducts'))
  }
]

export const stepperCampaignShoutoutsSteps = [
  {
    label: intl.get('campaigns.shoutouts.form.stepText1'),
    page: lazy(() => import('../components/organisms/CampaignsShoutoutsStepsSettings'))
  },
  {
    label: intl.get('campaigns.shoutouts.form.stepText2'),
    page: lazy(() => import('../components/organisms/CampaignsShoutoutsStepsTargetForm')),
    type: 'antd'
  },
  {
    label: intl.get('campaigns.shoutouts.form.stepText3'),
    page: lazy(() => import('../components/organisms/CampaignsStepsAssignProducts'))
  }
]

export const stepperCampaignBoost = [
  {
    label: intl.get('campaigns.boost.form.stepText1'),
    page: lazy(() => import('../components/organisms/CampaignsBoostStepsSettings'))
  },
  {
    label: intl.get('campaigns.boost.form.stepText2'),
    page: lazy(() => import('../components/organisms/CampaignsBoostStepsTargetForm')),
    type: 'antd'
  },
  {
    label: intl.get('campaigns.boost.form.stepText3'),
    page: lazy(() => import('../components/organisms/CampaignsBoostStepsOptions'))
  }
]

export const stepperCampaignReminder = [
  {
    label: intl.get('campaigns.reminder.form.stepText1'),
    page: lazy(() => import('../components/organisms/CampaignsReminderStepsSettings'))
  },
  {
    label: intl.get('campaigns.reminder.form.stepText2'),
    page: lazy(() => import('../components/organisms/CampaignsBoostStepsTargetForm')),
    type: 'antd'
  }
]

export const stepperCampaignFeatured = [
  {
    label: intl.get('campaigns.featured.form.stepText1'),
    page: lazy(() => import('../components/organisms/CampaignsFeaturedStepsSettings'))
  },
  {
    label: intl.get('campaigns.featured.form.stepText2'),
    page: lazy(() => import('../components/organisms/CampaignsFeaturedStepsTarget')),
    type: 'antd'
  }
]
